import { AddDiscountController } from "@/controllers/addDiscountController";
import { RemoveDiscountController } from "@/controllers/removeDiscountController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { milkteaId } = await req.json();

    const result = await RemoveDiscountController(milkteaId);

    return NextResponse.json({
      isSuccess: true,
      message: "Discount removed successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      isSuccess: false,
      message: "An error occurred while removing the discount try again later",
    });
  }
}
