"use server";
import { connectMongoDB } from "@/lib/mongodb";
import DestinationModel from "@/models/Destination.model"; // Assuming model import
import { NextResponse } from "next/server";
await connectMongoDB();
export async function GET(req) {
  const url = new URL(req.url);
  try {
    const latitude = url.searchParams.get("lat");
    const longitude = url.searchParams.get("long");

    const latitudeNumber = parseFloat(latitude);
    const longitudeNumber = parseFloat(longitude);

    // if(isNaN(latitudeNumber) || isNan(longitudeNumber)) {
    //     return NextResponse.json([], { status: 200 });
    // }

    const nearbyDestinations = await DestinationModel.find({
      latitude: { $gte: latitudeNumber - 0.5, $lte: longitudeNumber + 0.5 },
      longitude: { $gte: latitudeNumber - 0.5, $lte: longitudeNumber + 0.5 },
    })
      .limit(20)
      .lean();

    if (!nearbyDestinations) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(nearbyDestinations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
