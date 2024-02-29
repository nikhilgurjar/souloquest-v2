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
    const { bookingIds, status } = reqBody;

    if (!bookingIds || !status) {
      return NextResponse.json(
        { message: "Please provide bookingIds and status" },
        { status: 400 }
      );
    }

    for (let id in bookingIds) {
      const updatedBookings = await CompanyBooking.findById(bookingIds[id]);
      updatedBookings.status = status;
      await updatedBookings.save();
    }

    // Response
    return NextResponse.json(
      {
        message: `Bookings updated successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the tourCompany." },
      { status: 500 }
    );
  }
}
