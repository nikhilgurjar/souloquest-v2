"use server";
import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import ChatRoomModel from "@/models/ChatRoom.model";
import PartnerModel from "@/models/Partner.model"; // Assuming model import
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  await connectMongoDB();
  try {
    const room_id = url.searchParams.get("room_id");
    const userId = await getDataFromToken(req);
    console.log(room_id);
    if (!userId) {
      const loginUrl = new URL("/login", req.url);
      // Add ?from=/incoming-url to the /login URL
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      // And redirect to the new URL
      return NextResponse.redirect(loginUrl);
    }
    const updatedRoom = await ChatRoomModel.updateOne(
      { _id: room_id },
      {
        $push: { participants: userId },
      }
    );

    return NextResponse.json(
      { message: "Joined room successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
