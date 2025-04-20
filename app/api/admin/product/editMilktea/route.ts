import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Milktea from "@/models/milkteaModel";
import cloudinary from "@/lib/cloudinaryConfig";
import { replaceNewImagefromCurrentImage } from "@/utils/asyncHelpers";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const rawSugarLevel = formData.get("sugarLevel") as string;
    const rawSizes = formData.get("sizes") as string;
    const rawAddons = formData.get("addons") as string;

    const sugarLevel = rawSugarLevel ? JSON.parse(rawSugarLevel) : [];
    const sizes = rawSizes ? JSON.parse(rawSizes) : [];
    const addons = rawAddons ? JSON.parse(rawAddons) : [];

    const image = formData.get("image");

    const params: any = {
      name,
      description,
      sugarLevel,
      sizes,
      addons,
    };

    // 🔄 Upload new image to Cloudinary (if provided)
    if (image && image instanceof File) {
      try {
        const buffer = Buffer.from(await image.arrayBuffer());

        const imageUrl = await new Promise<string>((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ folder: "milktea_pictures" }, (error, result) => {
              if (error) {
                console.error("Cloudinary upload failed:", error);
                reject("Failed to upload image");
              } else {
                resolve(result?.secure_url || "");
              }
            })
            .end(buffer);
        });

        // 🔁 Delete previous Cloudinary image (if implemented)
        await replaceNewImagefromCurrentImage(Milktea, id);

        params.imageUrl = imageUrl;
      } catch (error) {
        console.error("Cloudinary image error:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // ✅ Update in MongoDB
    const updated = await Milktea.findByIdAndUpdate(id, params, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      isSuccess: true,
      product: updated,
      message: "Product Update Successfully!",
    });
  } catch (error) {
    console.error("Edit product error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
