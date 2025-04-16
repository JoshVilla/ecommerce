import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/userModel";
import { hashPassword } from "@/utils/asyncHelpers";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const {
      email,
      firstname,
      middlename,
      lastname,
      password,
      birthdate,
      phone,
      address,
    } = await request.json();

    const existingUser = await User.collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      email,
      firstname,
      middlename,
      lastname,
      password: hashedPassword,
      birthdate,
      phone,
      address,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", isSuccess: true },
      { status: 201 }
    );
  } catch (error) {
    console.log("Internal Error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
