import { connectToDatabase } from "@/lib/mongodb";
import Milktea from "@/models/milkteaModel";

import {
  replaceNewImagefromCurrentImage,
  uploadImageToCloudinary,
} from "@/utils/asyncHelpers";

export async function updateMilkteaProduct(formData: FormData) {
  await connectToDatabase();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const sugarLevel = formData.get("sugarLevel")?.toString() ?? "[]";
  const sizes = formData.get("sizes")?.toString() ?? "[]";
  const addons = formData.get("addons")?.toString() ?? "[]";
  const image = formData.get("image");

  const params: any = {
    name,
    description,
    sugarLevel: JSON.parse(sugarLevel),
    sizes: JSON.parse(sizes),
    addons: JSON.parse(addons),
  };

  if (image && image instanceof File) {
    const imageUrl = await uploadImageToCloudinary(image);
    await replaceNewImagefromCurrentImage(Milktea, id);
    params.imageUrl = imageUrl;
  }

  const updated = await Milktea.findByIdAndUpdate(id, params, {
    new: true,
    runValidators: true,
  });

  return updated;
}
