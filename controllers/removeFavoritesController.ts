import { connectToDatabase } from "@/lib/mongodb";
import Favorites from "@/models/favoritesModel";

export async function RemoveMyFavoritesController(
  customerId: string,
  milkteaId: string
) {
  try {
    await connectToDatabase();

    const updatedFavorites = await Favorites.findOneAndUpdate(
      { customerId },
      { $pull: { favorites: { _id: milkteaId } } },
      { new: true }
    );

    return updatedFavorites;
  } catch (error) {
    console.log(error);
  }
}
