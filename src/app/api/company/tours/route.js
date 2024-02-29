import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import TourTemplate from "@/models/TourTemplate.model";
import { NextResponse } from "next/server";

await connectMongoDB();

export async function GET(req) {
  try {
    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const mytours = url.searchParams.get("mytours") || "";

    const searchTerm = url.searchParams.get("searchTerm") || "";
    const page = parseInt(url.searchParams.get("page") || "1"); // Add page parameter
    const limit = 20; // Set pagination limit
    let query = {};

    if (mytours) {
      query = { tourCompany: tourCompanyId };
    } else {
      query = { tourCompany: { $ne: tourCompanyId } }; // Fetch tours not created by user
    }

    if (searchTerm) {
      query = {
        $and: [
          query,
          {
            destinations: { $regex: searchTerm, $options: "i" },
          },
        ],
      };
    }

    const tours = await TourTemplate.find(query)
      .populate({
        path: "tourCompany",
        select: "name",
        model: TourCompany,
      })
      .lean()
      .skip((page - 1) * limit)
      .limit(limit); // Apply pagination

    return NextResponse.json(tours, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
