"use server";
import { getJWTToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

connectMongoDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if tourCompany exists
    const tourCompany = await TourCompany.findOne({ email });
    if (!tourCompany) {
      return NextResponse.json(
        { error: "Company does not exist" },
        { status: 400 }
      );
    }

    if (!tourCompany.emailVerified) {
      return NextResponse.json(
        { error: "Email not verified" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(
      password,
      tourCompany.password
    );
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: tourCompany._id,
      username: tourCompany.username,
      email: tourCompany.email,
    };
    //create token
    const token = await getJWTToken({ tokenData });
    tourCompany.password = null;

    const response = NextResponse.json({
      tourCompany: tourCompany,
      message:
        "Login successful. Please check your email for email verification.",
      success: true,
    });
    response.cookies.set(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "strict",
      path: "/", // Accessible site-wide
      maxAge: 86400, // 24-hours or whatever you like
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 400 }
    );
  }
}
