import { NextRequest, NextResponse } from "next/server";
import { updateMilkteaProduct } from "@/controllers/editMilkteaController";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const updatedProduct = await updateMilkteaProduct(formData);

    return NextResponse.json({
      isSuccess: true,
      product: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("Edit product error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
