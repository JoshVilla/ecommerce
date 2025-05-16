import { getAccountInfo } from "@/controllers/getAccountInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const accountData = await getAccountInfo(userId);

    return NextResponse.json({
      message: "Account data fetched successfully",
      accountData,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
