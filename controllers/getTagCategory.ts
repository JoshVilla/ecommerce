import { connectToDatabase } from "@/lib/mongodb";
import TagCategory from "@/models/taggedProductsModel.";

export const tagMilkteaData = async () => {
  await connectToDatabase();

  const data = TagCategory.find({});

  return data;
};
