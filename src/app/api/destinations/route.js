"use server";
import { connectMongoDB } from "@/lib/mongodb";
import DestinationModel from "@/models/Destination.model"; // Assuming model import
import { NextResponse } from "next/server";

async function getDestinations({ filters }) {
  const query = {};

  Object.entries(filters).forEach(([key, value]) => {
    // Handle specific filters appropriately
    if (key === "duration") {
      query["duration.min"] = { $lte: value };
      query["duration.max"] = { $gte: value };
    } else {
      query[key] = value;
    }
  });

  const destinations = await DestinationModel.find(query)
    .limit(20)
    .sort({ ratings: -1 });
  return destinations;
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const validFilters = Object.fromEntries(
      Object.entries(req.query).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    const destinations = await getDestinations({ filters: validFilters });
    return NextResponse.json(destinations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
