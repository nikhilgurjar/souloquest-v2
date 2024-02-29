import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/lib/helper";

export async function POST(req) {
  try {
    const userId = await getDataFromToken(request);
    if(!userId) NextResponse.redirect('/login');
    
    const {oldPassword, password} = await req.json();

    await connectMongoDB();
    
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 409 }
      );
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt);
    
    existingUser.password = hashedPassword;
    await existingUser.save();

    return NextResponse.json({ message: "password updated successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}