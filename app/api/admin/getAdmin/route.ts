import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/adminModel";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { username, status } = await req.json();

    const params: any = {};

    if (username) {
      params.username = username;
    }
    if (status) {
      params.status = status;
    }

    const admins = await Admin.find(params);

    if (!admins) {
      return NextResponse.json({ message: "No Admins Found" }, { status: 404 });
    }
    return NextResponse.json({ data: admins }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
