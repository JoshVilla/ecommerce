import { AddDiscountController } from "@/controllers/addDiscountController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { discountedPrizes, milkteaId, saleAmount } = await req.json();

    const result = await AddDiscountController(
      milkteaId,
      discountedPrizes,
      saleAmount
    );

    return NextResponse.json({
      isSuccess: true,
      message: "Discount added successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      isSuccess: false,
      message: "An error occurred while adding the discount try again later",
    });
  }
}
function addDiscountController(
  milkteaId: any,
  discountedPrizes: any,
  saleAmount: any
) {
  throw new Error("Function not implemented.");
}
