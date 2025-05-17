import mongoose from "mongoose";
import User from "@/models/userModel";
import { connectToDatabase } from "@/lib/mongodb";
import Address from "@/models/addressModel";

export async function updateUserAccountController(
  userId: string,
  userInfos: any
) {
  await connectToDatabase();
  const { birthdate, email, firstname, lastname, middlename, phone, gender } =
    userInfos;

  const address = await Address.findOne({
    userId,
    isDefaultAddress: true,
  });

  const updatedUser = await User.findByIdAndUpdate(userId, {
    firstname,
    middlename,
    lastname,
    email,
    birthdate,
    phone,
    gender,
  }).lean();

  return { ...updatedUser, address };
}
