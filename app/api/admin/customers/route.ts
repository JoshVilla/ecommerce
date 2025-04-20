import { getCustomers } from "@/controllers/getCustomersController";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const customers = await getCustomers(req);
    return NextResponse.json({
      data: customers,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
