import { connectToDatabase } from "@/lib/mongodb";
import Favorites from "@/models/favoritesModel";
import Milktea from "@/models/milkteaModel";

export async function addMyFavoritesController(
  customerId: string,
  milkteaId: string
) {
  try {
    await connectToDatabase();

    const milkteaInfo = await Milktea.findById(milkteaId).lean();
    if (!milkteaInfo) {
      return { isSuccess: false, message: "Milktea not found" };
    }

    let favoritesDoc = await Favorites.findOne({ customerId });

    if (!favoritesDoc) {
      const newFavorites = await Favorites.create({
        customerId,
        favorites: [milkteaInfo],
      });
      return {
        isSuccess: true,
        message: "Successfully added to favorites",
        data: newFavorites,
      };
    }

    const alreadyFavorited = favoritesDoc.favorites.some(
      (fav: any) => fav._id.toString() === milkteaId
    );

    if (alreadyFavorited) {
      return {
        isSuccess: false,
        message: "Already in favorites",
        data: favoritesDoc,
      };
    }
    //@ts-ignore
    favoritesDoc.favorites.push(milkteaInfo);
    const updated = await favoritesDoc.save();

    return {
      isSuccess: true,
      message: "Successfully added to favorites",
      data: updated,
    };
  } catch (error) {
    console.error("Add favorite error:", error);
    return { isSuccess: false, message: "Internal server error" };
  }
}
