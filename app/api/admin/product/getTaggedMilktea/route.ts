import { tagMilkteaData } from "@/controllers/getTagCategory";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { category } = await req.json();
    const data = await tagMilkteaData(category);

    return NextResponse.json({
      data,
      isSuccess: true,
    });
  } catch (error) {
    console.log("Internal Server Error");
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
