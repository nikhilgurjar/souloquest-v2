import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userId = await getDataFromToken(req);
    if(!userId) NextResponse.redirect('/login');
    const {facebook, instagram, linkedin, twitter} = await req.json();

    await connectMongoDB();
    
    const newSocialMedia = {
      facebook,
      instagram,
      linkedin,
      twitter
    };

    const existingUser = await User.findByIdAndUpdate(userId, { socialMedia: newSocialMedia },{ new: true });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Profile has been updated", user: existingUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}