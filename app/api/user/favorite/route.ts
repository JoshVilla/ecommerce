import { NextResponse, NextRequest } from "next/server";
import { getMyFavoritesController } from "@/controllers/getFavorites";
import { verifyToken } from "@/utils/nonAsyncHelpers";

export async function POST(req: NextRequest) {
  try {
    const token = verifyToken(req.headers.get("Authorization"));

    const getMyFavorites = await getMyFavoritesController(token?.userId);

    return NextResponse.json({
      data: getMyFavorites,
    });
  } catch (error) {
    console.error("JWT verification or fetch failed:", error);
    return NextResponse.json(
      { error: "Unauthorized or error occurred" },
      { status: 401 }
    );
  }
}
