import { getDataFromToken } from "@/lib/helper";
import { connectMongoDB } from "@/lib/mongodb";
import ChatRoomModel from "@/models/ChatRoom.model";
import User from "@/models/User";
import { NextResponse } from "next/server";

  
export async function GET(req) {
    try{
        await connectMongoDB();
        const userId = await getDataFromToken(req);
        console.log(userId);
        const chatRooms = await ChatRoomModel.find({
            // participants: { $elemMatch: userId }
            $expr: {
              $in: [
                userId,
                "$participants"
              ]
            }
          }).populate({
            path: 'participants',
            select: '_id name profilePic email',
          }).lean(); // Use lean() for smaller response payload

        return NextResponse.json(chatRooms, { status: 200 });
        
    }
    catch(error){
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}