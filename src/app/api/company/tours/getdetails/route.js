"use server";
import TourTemplate from "@/models/TourTemplate.model";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";

await connectMongoDB();

export async function GET(req) {
  const url = new URL(req.url);
  try {
    const tourId = url.searchParams.get("tourId");
    if (!tourId) {
      return NextResponse.json(
        { error: "tourId is required" },
        { status: 400 }
      );
    }
    const tour = await TourTemplate.findOne({ tourId })
      .populate({
        path: "tourCompany",
        select: "name",
        model: TourCompany,
      })
      .lean();
    return NextResponse.json({ tourDetails: tour }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 400 }
    );
  }
}
