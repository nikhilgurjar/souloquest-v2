"use server";
import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import ChatRoomModel from "@/models/ChatRoom.model";
import PartnerModel from "@/models/Partner.model"; // Assuming model import
import uuidv4 from "@/utils/uuidv4";
import { NextResponse } from "next/server";

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};
await connectMongoDB();
export async function GET(req) {
  const url = new URL(req.url);
  try {
    let departureDate = url.searchParams.get("departureDate");
    const location = url.searchParams.get("location");

    if (!departureDate) {
      const requests = await PartnerModel.find().limit(10).lean();
      console.log(requests);
      return NextResponse.json(requests, { status: 200 });
    }
    departureDate = parseDate(departureDate);

    const twoDaysBefore = new Date(
      departureDate.getTime() - 2 * 24 * 60 * 60 * 1000
    );
    const twoDaysAfter = new Date(
      departureDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );

    const requests = await PartnerModel.find({
      departureDate: {
        $gte: twoDaysBefore,
        $lte: twoDaysAfter,
      },
      location: { $regex: new RegExp(location, "i") }, // Use regex for case-insensitive matching
    }).limit(20);
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
await connectMongoDB();
export async function POST(req) {
  const loginUrl = new URL("/login", req.url);
  try {
    const userId = await getDataFromToken(req);
    if (!userId) {
      // Add ?from=/incoming-url to the /login URL
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      // And redirect to the new URL
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    let { departureDate, location, description, title } = await req.json();
    console.info(departureDate, location, description, title);
    if (!departureDate || !location || !title) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    console.log(departureDate, location, description, title);
    console.log("reaching here");
    departureDate = parseDate(departureDate);

    const chatRoom = await ChatRoomModel.create({
      name: location + " trip",
      departureDate,
      participants: [userId],
      description,
      title,
      location,
    });

    const requests = await PartnerModel.create({
      departureDate,
      location,
      description,
      title,
      room_id: chatRoom._id,
    });
    console.log("success");
    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
