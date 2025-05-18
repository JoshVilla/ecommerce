import { NextResponse, NextRequest } from "next/server";
import { getMyFavoritesController } from "@/controllers/getFavorites";

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();
    const getMyFavorites = await getMyFavoritesController(customerId);

    return NextResponse.json({
      isSuccess: true,
      message: "Successfully get my favorites",
      data: getMyFavorites,
    });
  } catch (error) {
    console.log(error);
  }
}
