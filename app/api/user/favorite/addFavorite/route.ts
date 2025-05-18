import { NextResponse, NextRequest } from "next/server";
import { addMyFavoritesController } from "@/controllers/addFavoritesController";

export async function POST(req: NextRequest) {
  try {
    const { customerId, milkteaId } = await req.json();
    const addMyFavorites = await addMyFavoritesController(
      customerId,
      milkteaId
    );

    return NextResponse.json({
      isSuccess: true,
      message: "Successfully added to favorites",
      data: addMyFavorites,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
