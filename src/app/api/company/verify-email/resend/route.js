"use server";
import { getDataFromToken, getJWTToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const tourCompany = await TourCompany.findOne({ email: email });
    if (!tourCompany) {
      return NextResponse.json({ message: "User not found." }, { status: 409 });
    }

    const tokenData = {
      id: tourCompany._id,
      username: tourCompany.name,
      email: tourCompany.email,
    };

    const token = await getJWTToken({ tokenData, expirationTime: "1h" });

    const verificationURL = `${process.env.NEXT_APP_URL}/verify-email?token=${token}`;
    //create token

    const data = await resend.emails.send({
      from: "bu@resend.dev",
      to: email,
      subject: "Welcome to Souloquest!! Please confirm your email address",
      react: SouloquestConfirmationEmail({
        validationURL: verificationURL,
        name: tourCompany.name,
      }),
    });

    return NextResponse.json(
      { message: "Email sent. Please check inbox" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
