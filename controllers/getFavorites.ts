import { connectToDatabase } from "@/lib/mongodb";
import Favorites from "@/models/favoritesModel";

export async function getMyFavoritesController(customerId: string) {
  try {
    await connectToDatabase();

    const favorites = await Favorites.findOne({ customerId });

    //@ts-ignore
    const milkteaIds = favorites?.favorites.map((fav) => fav._id);

    return { ...favorites?.toObject(), milkteaIds };
  } catch (error) {
    console.log(error);
  }
}
