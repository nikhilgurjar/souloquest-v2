"use server";

import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import TourCompany from "@/models/TourCompany.model";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function GET(request) {
  try {
    const tourCompanyId = await getDataFromToken(request);
    if (!tourCompanyId) NextResponse.redirect("/login");
    console.log(tourCompanyId);
    const user = await TourCompany.findOne({ _id: tourCompanyId }).select(
      "-password"
    );
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      );
    }
    return NextResponse.json({
      mesaaage: "TourCompany found",
      tourCompany: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
