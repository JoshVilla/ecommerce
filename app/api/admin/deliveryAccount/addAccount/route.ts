import { NextRequest, NextResponse } from "next/server";
import { addDeliveryAccountController } from "@/controllers/addDeliveryAccountController";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const newAccount = await addDeliveryAccountController(username, password);

    return NextResponse.json(newAccount);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Adding Account Failed try again later",
      isSuccess: false,
    });
  }
}
