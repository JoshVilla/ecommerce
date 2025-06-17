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
    console.log(error);
    return {
      message: "Unsuccessfull Operation, Try again later",
      isSucces: false,
    };
  }
}
