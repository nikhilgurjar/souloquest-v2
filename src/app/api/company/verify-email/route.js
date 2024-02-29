"use server";
import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Please regenerate verification email" },
        { status: 400 }
      );
    }

    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId)
      return NextResponse.json(
        { message: "Please regenerate verification email" },
        { status: 401 }
      );

    const tourCompany = await TourCompany.findById(tourCompanyId);
    if (!tourCompany) {
      return NextResponse.json(
        { message: "Tour Company not found." },
        { status: 409 }
      );
    }

    tourCompany.email_verified = true;
    await tourCompany.save();

    return NextResponse.json(
      { message: "Email verified. Please login" },
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
