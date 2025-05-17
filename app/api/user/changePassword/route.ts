import { NextResponse, NextRequest } from "next/server";
import { changePasswordController } from "@/controllers/changePasswordController";

export async function POST(req: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await req.json();

    const result = await changePasswordController(
      userId,
      newPassword,
      currentPassword
    );

    if (!result) {
      return NextResponse.json(
        { isSuccess: false, message: "Incorrect password" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      data: result,
      isSuccess: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cannot Update Password" },
      { status: 500 }
    );
  }
}
