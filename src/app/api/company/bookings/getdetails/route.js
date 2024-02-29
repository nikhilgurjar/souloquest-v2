"use server";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import CompanyBooking from "@/models/Booking.model";
import TourCompany from "@/models/TourCompany.model";

await connectMongoDB();

export async function GET(req) {
  const url = new URL(req.url);
  try {
    const bookingId = url.searchParams.get("bookingId");

    const tour = await CompanyBooking.findOne({
      _id: bookingId,
      status: "accepted",
    })
      .populate({
        path: "tourCompany",
        select: "name email phoneNumber",
        model: TourCompany,
      })
      .populate({
        path: "requestedBy",
        select: "name",
        model: TourCompany,
      })
      .lean();

    if (!tour) {
      return NextResponse.json({ message: "Tour not found" });
    }

    return NextResponse.json({ bookingDetails: tour }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 400 }
    );
  }
}
