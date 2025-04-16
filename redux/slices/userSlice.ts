import { IUser } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | {};
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
