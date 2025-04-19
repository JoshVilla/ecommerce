import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Milktea from "@/models/milkteaModel";
import cloudinary from "@/lib/cloudinaryConfig";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const imageFile = formData.get("image");
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const sugarLevel = JSON.parse(formData.get("sugarLevel") as string); // should be array of numbers
    const sizes = JSON.parse(formData.get("sizes") as string);
    const addons = JSON.parse(formData.get("addons") as string);

    //check if product name is existed
    const existedProduct = await Milktea.findOne({ name });
    if (existedProduct) {
      return NextResponse.json(
        { message: "Product name already exists" },
        { status: 409 }
      );
    }

    let imageUrl = "";
    if (imageFile && imageFile instanceof File) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        imageUrl = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ folder: "milktea_pictures" }, (error, result) => {
              if (error) {
                console.error("Cloudinary upload failed:", error);
                reject(new Error("Failed to upload image"));
              } else {
                resolve(result?.secure_url || "");
              }
            })
            .end(buffer);
        });
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const newProduct = await Milktea.create({
      imageUrl,
      name,
      description,
      sugarLevel,
      sizes,
      addons,
    });

    return NextResponse.json(
      {
        data: newProduct,
        isSuccess: true,
        message: "Product added successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("POST /api/milktea error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
