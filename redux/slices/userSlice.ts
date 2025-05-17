import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { INewAddress, IUserState } from "@/utils/types";
import { getAccountInfo } from "@/service/api";

// Async thunk to fetch user data
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId: string) => {
    const response = await getAccountInfo({ userId });

    const data = await response;
    return data.accountData as IUserState;
  }
);

interface UserState {
  user: IUserState | {};
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
    dispatchSetDefaultAddress: (state, action: PayloadAction<INewAddress>) => {
      //@ts-ignore
      state.user.address = action.payload;
    },
    dispatchChangePassword: (state, action: PayloadAction<string>) => {
      //@ts-ignore
      state.user.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  setUser,
  clearUser,
  dispatchSetDefaultAddress,
  dispatchChangePassword,
} = userSlice.actions;
export default userSlice.reducer;
