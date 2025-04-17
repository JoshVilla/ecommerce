import { post } from "./service";

export const login = async (params: any): Promise<any> => {
  return await post("/api/login", params);
};

export const signup = async (params: any): Promise<any> => {
  return await post("/api/signup", params);
};

export const addAdmin = async (params: any): Promise<any> => {
  return await post("/api/admin/addAdmin", params);
};

export const getAdmin = async (params: any): Promise<any> => {
  return await post("/api/admin/getAdmin", params);
};

export const loginAdmin = async (params: any): Promise<any> => {
  return await post("/api/admin/login", params);
};
