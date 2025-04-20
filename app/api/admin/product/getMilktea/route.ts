import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Milktea from "@/models/milkteaModel";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { id } = await req.json();

    const params: any = {};
    if (id) params.id = id;

    const products = await Milktea.find(params);

    return NextResponse.json({ data: products });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
