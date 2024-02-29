import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import { NextResponse } from "next/server";

await connectMongoDB();

export async function POST(req) {
  try {
    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId)
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );

    const { companyLogo, phoneNumber, address, about } = await req.json();
    if (!phoneNumber || !address) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const existingTourCompany = await TourCompany.findByIdAndUpdate(
      tourCompanyId,
      {
        companyLogo,
        phoneNumber,
        address,
        about,
      },
      { new: true }
    );
    if (!existingTourCompany) {
      return NextResponse.json(
        { message: "TourCompany not found." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Profile has been updated", tourCompany: existingTourCompany },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the tourCompany." },
      { status: 500 }
    );
  }
}
