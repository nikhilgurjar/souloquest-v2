import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        
    }
    catch(error){
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
          );
    }
}