import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Milktea from "@/models/milkteaModel";
import { getCloudinaryPublicId } from "@/utils/nonAsyncHelpers";
import { deleteCloudinaryImage } from "@/utils/asyncHelpers";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { id } = await req.json();

    const item = await Milktea.findById(id);

    const cloudImgId = getCloudinaryPublicId(item.image_url) as string;

    await deleteCloudinaryImage(cloudImgId);

    const product = await Milktea.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product deleted successfully!",
      data: product,
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
