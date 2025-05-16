import { deleteUserAddress } from "@/controllers/deleteAddress";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { addressId } = await req.json();

    const res = await deleteUserAddress(addressId);
    return NextResponse.json(
      { data: res, isSuccess: true, message: "Address Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting address", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
