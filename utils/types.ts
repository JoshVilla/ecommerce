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
