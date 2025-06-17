import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/adminModel";
import { hashPassword } from "@/utils/asyncHelpers";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { username, password, status } = await req.json();

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      status,
    });
    await newAdmin.save();

    return NextResponse.json(
      {
        message: "Admin created successfully",
        isSuccess: true,
        admin: newAdmin,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", isSuccess: false },
      { status: 500 }
    );
  }
}
