import { NextResponse, NextRequest } from "next/server";
import { updateMilkteaTag } from "@/controllers/tagCategoryController";

export async function POST(req: NextRequest) {
  try {
    const params = await req.json();
    const updatedData = await updateMilkteaTag(params);

    return NextResponse.json({
      data: updatedData,
      message: "Section Updated!",
      isSuccess: true,
    });
  } catch (error) {
    console.error(" error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
