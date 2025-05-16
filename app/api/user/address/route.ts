import { getAddress } from "@/controllers/getAddress";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;
    const data = await getAddress(userId);
    return NextResponse.json({
      data,
      message: "Success",
      status: 200,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error fetching address",
      status: 500,
    });
  }
}
