"use server";
import SouloquestForgotPass from "@/email-templates/forgot-password";
import { getJWTToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import { resend } from "@/utils/resend";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Missing Email." }, { status: 400 });
    }

    await connectMongoDB();

    const tourCompany = await TourCompany.findOne({ email });
    if (!tourCompany) {
      return NextResponse.json({ message: "User not found." }, { status: 409 });
    }

    const tokenData = {
      id: tourCompany._id,
      username: tourCompany.name,
      email: tourCompany.email,
    };

    const token = await getJWTToken({ tokenData, expirationTime: "1h" });

    const verificationURL = `${process.env.NEXT_APP_URL}/new-password?token=${token}`;
    //create token

    const data = await resend.emails.send({
      from: "noreply@souloquest.com",
      to: email,
      subject: "Password reset request has been raised",
      react: SouloquestForgotPass({
        passwordResetURL: verificationURL,
        name: tourCompany.name,
      }),
    });

    return NextResponse.json(
      { message: "Password reset link has been sent to your email." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
