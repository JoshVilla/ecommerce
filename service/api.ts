import { post } from "./service";

export const login = async (params: any): Promise<any> => {
  return await post("/api/login", params);
};
