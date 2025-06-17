import { NextResponse, NextRequest } from "next/server";
import { deleteAdminController } from "@/controllers/deleteAdminController";

export async function POST(req: NextRequest) {
  const { adminId } = await req.json();
  try {
    const res = deleteAdminController(adminId);

    return NextResponse.json({
      isSuccess: true,
      message: "Admin deleted successfully",
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      isSuccess: false,
      message: "Failed to delete admin",
    });
  }
}
