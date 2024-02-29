"use server";
import * as JOSE from "jose";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getJwtSecretKey } from "@/lib/helper";

await connectMongoDB();

export async function POST(req) {
  try {
    const { password, token } = await req.json();
    if (!password || !token) {
      return NextResponse.json(
        { message: "Malformed request." },
        { status: 400 }
      );
    }

    const { payload } = await JOSE.jwtVerify(token, await getJwtSecretKey());
    const tourCompanyId = payload.id;

    const tourCompany = await TourCompany.findById(tourCompanyId);

    if (!tourCompany) {
      return NextResponse.json({ message: "User not found." }, { status: 409 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    tourCompany.password = hashedPassword;

    await tourCompany.save();

    return NextResponse.json(
      { message: "Successfully Updated password. Please login!!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
