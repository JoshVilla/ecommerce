import { connectToDatabase } from "@/lib/mongodb";
import Favorites from "@/models/favoritesModel";

export async function getMyFavoritesController(customerId: string) {
  try {
    await connectToDatabase();

    const favorites = await Favorites.findOne({ customerId });
    return favorites;
  } catch (error) {
    console.log(error);
  }
}
