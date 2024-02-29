import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function GET(request){

    try {
        const userId = await getDataFromToken(request);
        if(!userId) NextResponse.redirect('/login');
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}