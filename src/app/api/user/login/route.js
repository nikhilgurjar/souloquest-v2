import { getJWTToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

connectMongoDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await getJWTToken({ tokenData });
    user.password = null;

    const response = NextResponse.json({
      user: user,
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "strict",
      path: "/", // Accessible site-wide
      maxAge: 86400, // 24-hours or whatever you like
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
