import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/adminModel";

export async function deleteAdminController(adminId: string) {
  try {
    await connectToDatabase();

    const deletedAdmin = Admin.findByIdAndDelete(adminId);

    return deletedAdmin;
  } catch (error) {
    console.log(error);
  }
}
