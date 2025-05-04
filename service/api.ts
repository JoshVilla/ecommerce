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

export const addMilktea = async (params: any): Promise<any> => {
  return await post("/api/admin/product/addMilktea", params, true);
};

export const getMilktea = async (params: any): Promise<any> => {
  return await post("/api/admin/product/getMilktea", params);
};

export const deleteMilktea = async (params: any): Promise<any> => {
  return await post("/api/admin/product/deleteMilktea", params);
};

export const editMilktea = async (params: any): Promise<any> => {
  return await post("/api/admin/product/editMilktea", params, true);
};

export const getCustomers = async (params: any): Promise<any> => {
  return await post("/api/admin/customers", params);
};

export const updateTaggedMilktea = async (params: any): Promise<any> => {
  return await post("/api/admin/product/tagMilktea", params);
};

export const getTaggedMilktea = async (params: any): Promise<any> => {
  return await post("/api/admin/product/getTaggedMilktea", params);
};
