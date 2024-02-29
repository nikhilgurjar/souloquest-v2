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

    console.log(`tourCompanyId: ${tourCompanyId}`);

    const reqBody = await req.json();
    const { bookingIds, status } = reqBody;

    if (!bookingIds || !status) {
      return NextResponse.json(
        { message: "Please provide bookingIds and status" },
        { status: 400 }
      );
    }

    console.log(status, bookingIds);

    // Update Bookings
    // const updatedBookings = await CompanyBooking.updateMany(
    //   { _id: { $in: bookingIds } },
    //   { $set: { status: status } }
    // );
    for (let id in bookingIds) {
      const updatedBookings = await CompanyBooking.findById(bookingIds[id]);
      console.log(updatedBookings);
      updatedBookings.status = status;
      await updatedBookings.save();
    }
    // console.log("Number of documents updated:", updatedBookings);

    // Response
    return NextResponse.json(
      {
        message: `Bookings updated successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while registering the tourCompany." },
      { status: 500 }
    );
  }
}
