import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/helper";
import Tour from "@/models/Tour.model";
import uuidv4 from "@/utils/uuidv4";
import TourTemplate from "@/models/TourTemplate.model";
import { flattenNames } from "@/utils/flattenArray";

// Ensure the MongoDB connection is established

export async function POST(req) {
  try {
    await connectMongoDB();

    const tourCompanyId = await getDataFromToken(req);
    if (!tourCompanyId) {
      return NextResponse.json(
        { message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const requiredFields = [
      "title",
      "maxParticipants",
      "startDate",
      "priceOptions",
      "itenary",
      "destinations",
    ];

    console.log("calling update");

    const numDays = body.itenary.length;
    const tourId = uuidv4();
    console.log(body);
    const destinations = flattenNames(body.destinations);
    const included = flattenNames(body.included);
    const notIncluded = flattenNames(body.notIncluded);
    const hightlights = flattenNames(body.hightlights);

    const tourTemplateData = {
      title: body.title,
      overview: body.overview,
      categories: body.categories,
      destinations: destinations,
      included: included,
      notIncluded: notIncluded,
      hightlights: hightlights,
      images: body.images,
      recurrence: body.recurrence,
      frequency: body.frequency,
      frequencyWeekdays: body.frequencyWeekdays,
      frequencyDates: body.frequencyDates,
      priceOptions: body.priceOptions,
      itenary: body.itenary,
      numDays,
      startDate: body.startDate,
      numDays,
      maxParticipants: body.maxParticipants,
    };

    const tourTemplate = await TourTemplate.findByIdAndUpdate(
      body.id,
      tourTemplateData,
      { new: true }
    );

    return NextResponse.json(
      { message: "Tour has been updated", tour: tourTemplate },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while registering the tourCompany." },
      { status: 500 }
    );
  }
}
