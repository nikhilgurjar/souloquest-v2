import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Itenary from "@/models/Itenary.Model"
// import DestinationModel from "@/models/Destination.model"; // Assuming model import

export async function POST(req) {
    try{
      await connectMongoDB();
      const body = await req.json();
      console.log(body);
      const { id, title, description, image, destinations, userId, startDate, endDate } = body;
      if(!title || !destinations || !startDate || !endDate){
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      
      const newItenary = new Itenary({
        id,
        title: title,
        description: description,
        image: image,
        destinations: destinations,
        userId: userId,
        startDate: startDate,
        endDate: endDate
      });
      
      await newItenary.save();
      return NextResponse.json({ message: "Itenary created" }, { status: 201 });

    }
    catch(error){
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}