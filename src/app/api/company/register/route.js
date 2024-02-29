import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getJWTToken } from "@/lib/helper";
import TourCompany from "@/models/TourCompany.model";
import { resend } from "@/utils/resend";
import SouloquestConfirmationEmail from "@/email-templates/welcome-email";

await connectMongoDB();
export async function POST(req) {
  try {
    const { name, email, instagramLink, address, password, phoneNumber } =
      await req.json();
    if (
      !name ||
      !email ||
      !password ||
      !instagramLink ||
      !address ||
      !phoneNumber
    ) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const existingCompany = await TourCompany.findOne({
      $or: [{ email }, { phoneNumber }, { instagramLink }],
    });
    if (existingCompany) {
      return NextResponse.json(
        {
          message:
            "Company already exists. Please make sure email, phoneNumber and instagramLink are unique.",
        },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const tourCompany = await TourCompany.create({
      name,
      email,
      password: hashedPassword,
      instagramLink,
      address,
      phoneNumber,
    });

    const tokenData = {
      id: tourCompany._id,
      name: tourCompany.name,
      email: tourCompany.email,
    };

    const token = await getJWTToken({ tokenData, expirationTime: "1h" });

    const verificationURL = `${process.env.NEXT_APP_URL}/verify-email?token=${token}`;

    const data = await resend.emails.send({
      from: "noreply@souloquest.com",
      to: email,
      subject: "Welcome to Souloquest!! Please confirm your email address",
      react: SouloquestConfirmationEmail({
        validationURL: verificationURL,
        name,
      }),
    });

    const response = NextResponse.json({
      message: "Registeration successful",
      success: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the tourCompany." },
      { status: 500 }
    );
  }
}
