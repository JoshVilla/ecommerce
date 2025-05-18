import { format } from "date-fns";
import type { Metadata } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ORDER_STATUS, PAYMENT_SERVICE } from "./constant";
export const getCloudinaryPublicId = (url: string) => {
  if (!url) return null;

  try {
    const urlParts = url.split("/");
    const filenameWithExtension = urlParts.pop();
    const folder = urlParts.pop();

    if (!folder || !filenameWithExtension) return null;

    const filename = filenameWithExtension.split(".")[0];
    return `${folder}/${filename}`;
  } catch (error) {
    console.error("Error parsing Cloudinary URL:", error);
    return null;
  }
};

export const passwordValidation = (
  isValidFormat: boolean,
  isPasswordMatch: boolean
) => {
  return isValidFormat && isPasswordMatch ? true : false;
};

export const getMetadata = (title: string, description?: string): Metadata => {
  return {
    title: `${title || "Blogify"}`,
    description: description || "Be updated on what is happening",
  };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
  } catch (err) {
    return null;
  }
};

export const getDecodedToken = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt.decode(token);
    return decoded as JwtPayload;
  } catch (err) {
    console.error("Error decoding token", err);
    return null;
  }
};

export const formattedDate = (dateString?: string): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const orderStatusText = (status: number): string => {
  switch (status) {
    case ORDER_STATUS.CONFIRMING:
      return "Confirming";
    case ORDER_STATUS.PREPARING:
      return "Preparing";
    case ORDER_STATUS.DELIVERING:
      return "Delivering";
    case ORDER_STATUS.DELIVERED:
      return "Delivered";
    case ORDER_STATUS.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

export const paymentServiceText = (status: number): string => {
  switch (status) {
    case PAYMENT_SERVICE.PICKUP:
      return "Pickup";
    case PAYMENT_SERVICE.COD:
      return "Cash on Delivery";
    default:
      return "Unknown";
  }
};
