"use server";
import cloudinary from "@/lib/cloudinaryConfig";
import { connectToDatabase } from "@/lib/mongodb";

import { CLOUD_FOLDER_NAME, SALT_ROUNDS } from "./constant";
import bcrypt from "bcryptjs";
import { getCloudinaryPublicId } from "./nonAsyncHelpers";

export const deleteCloudinaryImage = async (publicId: string) => {
  if (!publicId) return null;

  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

export const replaceNewImagefromCurrentImage = async (
  collection: any,
  id: string
) => {
  try {
    await connectToDatabase();
    const res = await collection.findById(id); // Use findById instead of find

    if (res) {
      const publicId = getCloudinaryPublicId(res.image_url);
      if (publicId) {
        await deleteCloudinaryImage(publicId);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ folder: CLOUD_FOLDER_NAME }, (error, result) => {
        if (error || !result?.secure_url) {
          console.error("Cloudinary upload failed:", error);
          return reject("Failed to upload image");
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}
