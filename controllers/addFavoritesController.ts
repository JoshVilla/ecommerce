import { connectToDatabase } from "@/lib/mongodb";
import Favorites from "@/models/favoritesModel";
import Milktea from "@/models/milkteaModel";

export async function addMyFavoritesController(
  customerId: string,
  milkteaId: string
) {
  try {
    await connectToDatabase();

    // Get full milktea info as plain JS object
    const milkteaInfo = await Milktea.findById(milkteaId).lean();
    if (!milkteaInfo) {
      return { isSuccess: false, message: "Milktea not found" };
    }

    let favoritesDoc = await Favorites.findOne({ customerId });

    if (!favoritesDoc) {
      // No favorites yet, create new with first milktea embedded
      const newFavorites = new Favorites({
        customerId,
        favorites: [milkteaInfo],
      });
      const saved = await newFavorites.save();
      return {
        isSuccess: true,
        message: "Successfully added to favorites",
        data: saved,
      };
    }

    // Check if milktea is already in favorites by _id string comparison
    const alreadyFavorited = favoritesDoc.favorites.some(
      //@ts-ignore
      (fav) => fav._id.toString() === milkteaId
    );

    if (alreadyFavorited) {
      return {
        isSuccess: false,
        message: "Already in favorites",
        data: favoritesDoc,
      };
    }

    // Push full milktea info
    //@ts-ignore
    favoritesDoc.favorites.push(milkteaInfo);
    const updated = await favoritesDoc.save();

    return updated;
  } catch (error) {
    console.error("Add favorite error:", error);
  }
}
