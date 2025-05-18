import { NextRequest, NextResponse } from "next/server";
import { SetOrderController } from "@/controllers/setOrderController";

export async function POST(req: NextRequest) {
  try {
    const params = await req.json();

    console.log(params);

    const newOrder = await SetOrderController(params);

    return NextResponse.json({
      message: "Order Created",
      data: newOrder,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
