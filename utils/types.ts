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
}
