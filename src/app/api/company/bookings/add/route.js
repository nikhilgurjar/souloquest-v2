import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/helper";
import CompanyBooking from "@/models/Booking.model";
import TourTemplate from "@/models/TourTemplate.model";

await connectMongoDB();
export async function POST(req) {
  try {
    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const reqBody = await req.json();
    const {
      title,
      numPersons,
      location,
      email,
      phoneNumber,
      bookingDetails,
      comments,
      tourId,
      dateOfTravel,
      pricingOption,
    } = reqBody;

    if (
      !title ||
      !numPersons ||
      !location ||
      !email ||
      !phoneNumber ||
      !bookingDetails ||
      !tourId ||
      !dateOfTravel
    ) {
      return NextResponse.json(
        {
          message: "Please fill all the fields",
        },
        { status: 400 }
      );
    }

    const tourTemplate = await TourTemplate.findOne({ tourId }).lean();

    if (!tourTemplate) {
      return NextResponse.json(
        { message: "Tour Template not found" },
        { status: 400 }
      );
    }

    const response = await CompanyBooking.create({
      title,
      numPersons,
      location,
      email,
      phoneNumber,
      bookingDetails,
      comments,
      tourId,
      dateOfTravel,
      tourCompany: tourTemplate.tourCompany,
      requestedBy: tourCompanyId,
      pricingOption,
    });

    return NextResponse.json(
      { booking: response, message: "Booking created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the tourCompany." },
      { status: 500 }
    );
  }
}
