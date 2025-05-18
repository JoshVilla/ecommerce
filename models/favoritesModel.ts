import mongoose, { Schema, Document, Model } from "mongoose";

// Define Milktea subdocument schema to embed
const milkteaSubSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: String,
    imageUrl: String,
    sugarLevel: [Number],
    sizes: Array,
    addons: Array,
    createdAt: Date,
    updatedAt: Date,
  },
  { _id: false }
); // _id here comes from Milktea's _id, so disable auto _id for subdoc

export interface IFavorites extends Document {
  customerId: string;
  favorites: (typeof milkteaSubSchema)[];
}

const favoritesSchema = new Schema<IFavorites>({
  customerId: { type: String, required: true },
  favorites: [milkteaSubSchema], // embedded milktea objects
});

const Favorites: Model<IFavorites> =
  mongoose.models.Favorites ||
  mongoose.model<IFavorites>("Favorites", favoritesSchema);

export default Favorites;
