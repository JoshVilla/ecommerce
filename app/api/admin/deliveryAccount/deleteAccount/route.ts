import { NextResponse, NextRequest } from "next/server";
import { deleteDeliveryAccountController } from "@/controllers/deleteDeiveryAccountController";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const res = await deleteDeliveryAccountController(id);

    return NextResponse.json({
      message: res?.message,
      isSuccess: true,
    });
  } catch (error) {
    console.error("Error in deleteDeliveryAccount API:", error);
    return NextResponse.json(
      {
        message: "Unsuccessful Operation, Try again later",
        isSuccess: false,
      },
      { status: 500 }
    );
  }
}
