"use server";
import { connectMongoDB } from "@/lib/mongodb";
import DestinationModel from "@/models/Destination.model"; // Assuming model import
import { NextResponse } from "next/server";
await connectMongoDB();
export async function GET(req) {
  const url = new URL(req.url);
  try {
    const searchTerm = url.searchParams.get("searchTerm") || "";

    if (!searchTerm) {
      return NextResponse.json([], { status: 200 });
    }
    // Partial search with case-insensitive regex
    const regexPattern = new RegExp(`${searchTerm}`, "i");

    // Sort by relevance using textScore (assuming a text index on "name")
    const destinations = await DestinationModel.find({
      name: { $regex: regexPattern },
    })
      .collation({ locale: "en", strength: 2 }) // Prioritize exact matches
      // .sort({ score: { $meta: "textScore" } }) // Sort by textScore
      .limit(20)
      .lean();
    if (!destinations) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(destinations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
