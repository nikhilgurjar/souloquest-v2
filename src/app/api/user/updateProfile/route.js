import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userId = await getDataFromToken(req);
    if (!userId) NextResponse.redirect("/login");

    const { name, email, profilePic, phoneNumber, state, city, about } =
      await req.json();
    if (!email || !name || !profilePic || !state || !city || !about) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const existingUser = await User.findByIdAndUpdate(
      userId,
      { name, profilePic, phoneNumber, state, city, about },
      { new: true }
    );
    if (!existingUser) {
      return NextResponse.json({ message: "User not found." }, { status: 409 });
    }

    return NextResponse.json(
      { message: "Profile has been updated", user: existingUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
