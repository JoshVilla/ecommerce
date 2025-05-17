import mongoose from "mongoose";
import User from "@/models/userModel";
import { connectToDatabase } from "@/lib/mongodb";
import { comparePassword, hashPassword } from "@/utils/asyncHelpers";
import { NextResponse } from "next/server";

export async function changePasswordController(
  userId: string,
  newPassword: string,
  currentPassword: string
) {
  await connectToDatabase();

  const user = await User.findById(userId);
  if (!user) return false;

  const isCurrentPasswordMatch = await comparePassword(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordMatch) return false;

  const newHashedPassword = await hashPassword(newPassword);

  const updatedUser = await User.findByIdAndUpdate(userId, {
    password: newHashedPassword,
  });

  return updatedUser;
}
