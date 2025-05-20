import { connectToDatabase } from "@/lib/mongodb";
import TagCategory from "@/models/taggedProductsModel.";

export const tagMilkteaData = async (category: number) => {
  try {
    await connectToDatabase();

    let params: any = {};

    if (category) {
      params.category = category;
    }

    //get milktea data
    const data = await TagCategory.find(params).exec();

    return data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw error for proper error handling
  }
};
