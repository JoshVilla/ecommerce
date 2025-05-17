import { NextResponse, NextRequest } from "next/server";
import { updateUserAccountController } from "@/controllers/updateUserAccount";

export async function POST(req: NextRequest) {
  try {
    const { userId, userInfos } = await req.json();
    const res = await updateUserAccountController(userId, userInfos);

    return NextResponse.json({
      data: res,
      isSuccess: true,
      message: "Account Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Update Account Unsuccessfull, Try Again" },
      { status: 500 }
    );
  }
}
