import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
   const {email} = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Missing Email." },
        { status: 400 }
      );
    }

    await connectMongoDB();
    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Password reset link has been sent to your email." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}