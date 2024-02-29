"use server";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/lib/helper";
import TourCompany from "@/models/TourCompany.model";

await connectMongoDB();

export async function POST(req) {
  try {
    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId)
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );

    const { oldPassword, password } = await req.json();

    const existingCompany = await TourCompany.findById(tourCompanyId);
    if (!existingCompany) {
      return NextResponse.json(
        { message: "Tour Company not found." },
        { status: 409 }
      );
    }

    const isPasswordValid = await bcryptjs.compare(
      oldPassword,
      existingCompany.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    existingCompany.password = hashedPassword;
    await existingCompany.save();

    return NextResponse.json(
      { message: "password updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
