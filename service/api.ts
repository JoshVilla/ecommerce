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

export const addUserAddress = async (params: any): Promise<any> => {
  return await post("/api/user/address/addAddress", params);
};

export const getUserAddress = async (params: any): Promise<any> => {
  return await post("/api/user/address", params);
};

export const deleteUserAddress = async (params: any): Promise<any> => {
  return await post("/api/user/address/deleteAddress", params);
};

export const setDefaultAddress = async (params: any): Promise<any> => {
  return await post("/api/user/address/setDefaultAddress", params);
};

export const getAccountInfo = async (params: any): Promise<any> => {
  return await post("/api/user/accountInfo", params);
};

export const changePassword = async (params: any): Promise<any> => {
  return await post("/api/user/changePassword", params);
};

export const updateUserAccount = async (params: any): Promise<any> => {
  return await post("/api/user/updateUserAccount", params);
};

export const setOrder = async (params: any): Promise<any> => {
  return await post("/api/user/order/setOrder", params);
};

export const getOrders = async (params: any): Promise<any> => {
  return await post("/api/user/order", params);
};

export const updateOrderStatus = async (params: any): Promise<any> => {
  return await post("/api/user/order/updateOrderStatus", params);
};

export const addMyFavorites = async (params: any): Promise<any> => {
  return await post("/api/user/favorite/addFavorite", params);
};

export const removeMyFavorites = async (params: any): Promise<any> => {
  return await post("/api/user/favorite/removeFavorite", params);
};

export const getMyFavorites = async (params: any = {}): Promise<any> => {
  return await post("/api/user/favorite", params);
};

export const getPendingOrder = async (params: any): Promise<any> => {
  return await post("/api/user/order/getPendingOrder", params);
};
