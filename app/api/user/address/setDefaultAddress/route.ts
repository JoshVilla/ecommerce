import { defaultAddress } from "@/controllers/setDefaultAddress";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, addressId } = await req.json();
    const res = await defaultAddress(addressId, userId);

    return NextResponse.json(
      { data: res, isSuccess: true, message: "Default Address Updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
