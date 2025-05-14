import { IMyOrders } from "@/utils/types"; // the type above
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyOrderState {
  myOrders: IMyOrders[];
}

const initialState: MyOrderState = {
  myOrders: [],
};

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    addToMyOrders: (state, action: PayloadAction<IMyOrders>) => {
      const newOrder = action.payload;

      const existingOrder = state.myOrders.find(
        (order) =>
          order.product === newOrder.product &&
          order.sizePrice === newOrder.sizePrice &&
          order.sugarPrice === newOrder.sugarPrice &&
          order.addon === newOrder.addon
      );

      if (existingOrder) {
        // Merge quantities and recalculate total
        existingOrder.quantity += newOrder.quantity;
        existingOrder.total += newOrder.total;
      } else {
        // If not found, add as new
        state.myOrders.push(newOrder);
      }
    },
    clearMyOrders: (state) => {
      state.myOrders = [];
    },
  },
});

export const { addToMyOrders, clearMyOrders } = myOrdersSlice.actions;
export default myOrdersSlice.reducer;
