import mongoose from "mongoose";

interface ISizes {
  size: string;
  ml: string;
  price: string;
}

interface IAddOns {
  name: string;
  price: string;
}

export interface IMilktea {
  imageUrl: string; // store image URL or base64 string
  name: string;
  description: string;
  sugarLevel: number[]; // array of numbers like [0, 25, 50, 75]
  sizes: ISizes[];
  addons: IAddOns[];
}

const MilkteaSchema = new mongoose.Schema<IMilktea>(
  {
    imageUrl: { type: String, required: true }, // use image URL or base64 string
    name: { type: String, required: true },
    description: { type: String, required: true },
    sugarLevel: { type: [Number], required: true },
    sizes: {
      type: [
        {
          size: { type: String, required: true },
          ml: { type: String, required: true },
          price: { type: String, required: true },
        },
      ],
      required: true,
    },
    addons: {
      type: [
        {
          name: { type: String, required: true },
          price: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Milktea =
  mongoose.models.Milktea || mongoose.model<IMilktea>("Milktea", MilkteaSchema);

export default Milktea;
