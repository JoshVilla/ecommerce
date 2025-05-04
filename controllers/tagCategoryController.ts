import { connectToDatabase } from "@/lib/mongodb";
import TagCategory from "@/models/taggedProductsModel."; // Removed extra dot at end

interface UpdateParams {
  milkteaIds: string[];
  category: number;
}

export async function updateMilkteaTag(params: UpdateParams) {
  await connectToDatabase();

  const { milkteaIds, category } = params;

  const updatedDoc = await TagCategory.findOneAndUpdate(
    { category }, // find by category
    { $set: { milkteaIds } }, // set new milkteaIds
    { new: true, upsert: true } // return updated doc, create if not exists
  );

  return updatedDoc;
}
