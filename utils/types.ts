import { IAddressModel } from "@/models/addressModel";

export interface IApiResponse<T> {
  data: T;
  isSuccess?: boolean;
  message: string;
  error: string;
}

export interface IServiceParams {
  [key: string]: any;
}

export interface IUser {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  middlename: string;
  password: string;
  birthdate: string;
  phone: string;
  address?: string;
  gender: string;
  confirmPassword?: string;
}

export interface IAdmin {
  _id?: string;
  username: string;
  status: string;
}

export interface IMyOrders {
  id: string;
  addonPrice?: number;
  product: string;
  quantity: number;
  sizePrice: number;
  sugarPrice: number;
  total: number;
  size: string;
  addon?: string;
  description: string;
  image: string;
  sugar: string;
}

export interface INewAddress extends IAddressModel {
  _id: string;
}
