import { connectToDatabase } from "@/lib/mongodb";
import Milktea from "@/models/milkteaModel";

export async function RemoveDiscountController(milkteaId: string) {
  try {
    await connectToDatabase();

    // Find the milktea by ID
    const milktea = await Milktea.findById(milkteaId);

    if (!milktea) {
      return { isSuccess: false, message: "Milktea not found" };
    }

    // Update the sizes with new prices

    const updatedMilktea = await Milktea.findByIdAndUpdate(
      milkteaId,
      {
        saledPrizes: null,
        saleAmount: null,
        isSale: false,
      },
      { new: true }
    );

    return updatedMilktea;
  } catch (error) {
    console.log(error);
  }
}
