import { IAdmin } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  admin: IAdmin | {};
}

const initialState: AdminState = {
  admin: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<IAdmin>) => {
      state.admin = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = {};
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
