"use server";
import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import CompanyBooking from "@/models/Booking.model";
import TourCompany from "@/models/TourCompany.model";
import { NextResponse } from "next/server";

await connectMongoDB();

export async function GET(req) {
  const url = new URL(req.url);
  try {
    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      );
    }

    const requested = url.searchParams.get("requested") || false;

    const searchTerm = url.searchParams.get("searchTerm") || "";
    const page = parseInt(url.searchParams.get("page") || "1"); // Add page parameter
    const limit = 20; // Set pagination limit
    let query = {};
    if (requested) {
      query = { requestedBy: tourCompanyId };
    } else {
      query = { requestedBy: { $ne: tourCompanyId } }; // Fetch tours not created by user
    }

    const bookings = await CompanyBooking.find(query)
      .select("-bookingDetails")
      .populate({
        path: "requestedBy",
        select: "name",
        model: TourCompany,
      })
      .populate({
        path: "tourCompany",
        select: "name",
        model: TourCompany,
      })
      .lean()
      .skip((page - 1) * limit)
      .limit(limit); // Apply pagination

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 400 }
    );
  }
}
