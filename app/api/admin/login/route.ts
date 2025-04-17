import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/adminModel";
import { comparePassword } from "@/utils/asyncHelpers";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;

    //login admin
    const { username, password } = await req.json();

    const adminExist = await Admin.findOne({ username });
    if (!adminExist) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const passwordMatch = await comparePassword(password, adminExist.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    const { password: _, ...admin } = adminExist.toObject(); // Exclude password

    // Generate JWT token here if needed
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "Login successful", admin, isSuccess: true, token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
