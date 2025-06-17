import { NextRequest, NextResponse } from "next/server";
import { getDeliveryAccountsController } from "@/controllers/getDeliveryAccountsController";

export async function POST() {
  try {
    const list = await getDeliveryAccountsController();

    return NextResponse.json({
      data: list,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Unable to fecth the data, try again later",
    });
  }
}
