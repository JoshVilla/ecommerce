import { NextRequest, NextResponse } from "next/server";
import { addUserAddress } from "@/controllers/addAddressController";

export async function POST(req: NextRequest) {
  try {
    const { userAddress } = await req.json();

    const res = await addUserAddress(userAddress);
    return NextResponse.json(
      { data: res, isSuccess: true, message: "Address Added Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error adding address", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
