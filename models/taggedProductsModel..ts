import mongoose from "mongoose";

// NEW_PRODUCT: 1,
// BEST_SELLER: 2,
// PROMO_DISCOUNT: 3,

interface IMilkteaId {
  id: string;
  name: string;
}

export interface ITaggedProduct {
  milkteaIds: IMilkteaId[];
  category: number;
}

const TagCategorySchema = new mongoose.Schema<ITaggedProduct>(
  {
    milkteaIds: { type: [], required: true },
    category: { type: Number, required: true },
  },
  { timestamps: true }
);

const TagCategory =
  mongoose.models.TagCategory ||
  mongoose.model<ITaggedProduct>("TagCategory", TagCategorySchema);
export default TagCategory;
