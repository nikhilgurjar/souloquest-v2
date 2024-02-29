"use server";
import { connectMongoDB } from "@/lib/mongodb";
import DestinationModel from "@/models/Destination.model"; // Assuming model import
import { NextResponse } from "next/server";

const pageSize = 20;

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const pageNumber = url.searchParams.get("pageNumber");
    await connectMongoDB();
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    const destinations = await DestinationModel.find()
      .skip(skip)
      .limit(limit)
      .lean();
    return NextResponse.json(destinations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
