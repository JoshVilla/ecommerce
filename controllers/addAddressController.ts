import { connectToDatabase } from "@/lib/mongodb";
import Address, { IAddressModel } from "@/models/addressModel";

export async function addUserAddress(params: IAddressModel) {
  await connectToDatabase();

  const {
    region,
    province,
    barangay,
    city,
    cityCode,
    regionCode,
    provinceCode,
    barangayCode,
    otherAddress,
    userId,
    isDefaultAddress,
    addressInfo,
  } = params;

  const newAddress = Address.create({
    region,
    province,
    barangay,
    city,
    cityCode,
    regionCode,
    provinceCode,
    barangayCode,
    otherAddress,
    userId,
    isDefaultAddress,
    addressInfo,
  });

  return newAddress;
}
