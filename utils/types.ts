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

export interface IUserState {
  _id: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  password: string;
  birthdate: string;
  phone: string;
  address: {
    _id: string;
    region: string;
    province: string;
    city: string;
    barangay: string;
    addressInfo: string;
    regionCode: string;
    provinceCode: string;
    cityCode: string;
    barangayCode: string;
    otherAddress: string;
    userId: string;
    isDefaultAddress: boolean;
    __v: number;
  };
  gender: string;
  isSeller: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type IUserAddress = IUserState["address"];

export interface IOrder {
  _id?: string;
  address?: INewAddress;
  customerId: string;
  customerName: string;
  orderList: IMyOrders[];
  orderStatus: number;
  paymentServiceMode: number;
  total: number;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
