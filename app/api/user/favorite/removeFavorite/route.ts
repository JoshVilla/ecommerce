import { NextResponse, NextRequest } from "next/server";
import { RemoveMyFavoritesController } from "@/controllers/removeFavoritesController";

export async function POST(req: NextRequest) {
  try {
    const { customerId, milkteaId } = await req.json();

    const updatedFavorite = await RemoveMyFavoritesController(
      customerId,
      milkteaId
    );

    return NextResponse.json({
      message: "Remove favorites successfully",
      isSuccess: true,
      data: updatedFavorite,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "There is a problem removing your favorites, Try again later",
        isSuccess: false,
      },
      { status: 500 }
    );
  }
}
