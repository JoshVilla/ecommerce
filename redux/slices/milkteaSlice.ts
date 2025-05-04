import { INewMilktea } from "@/app/admin/products/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MilkteaState {
  milktea: INewMilktea | {};
}

const initialState: MilkteaState = {
  milktea: {},
};

const millkteaSlice = createSlice({
  name: "milktea",
  initialState,
  reducers: {
    setMilktea: (state, action: PayloadAction<INewMilktea>) => {
      state.milktea = action.payload;
    },
    clearMilktea: (state) => {
      state.milktea = {};
    },
  },
});

export const { setMilktea, clearMilktea } = millkteaSlice.actions;
export default millkteaSlice.reducer;
