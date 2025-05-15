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
          order.sugar === newOrder.sugar &&
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
    removeOrder: (state, action: PayloadAction<string>) => {
     state.myOrders =  state.myOrders.filter((order:IMyOrders) => order.id !== action.payload);
    },
    updateQuantity: (
        state,
        action: PayloadAction<{ id: string; newQuantity: number }>
    ) => {
      const { id, newQuantity } = action.payload;
      const order = state.myOrders.find((order) => order.id === id);

      if (order) {
        order.quantity = newQuantity;
        const baseTotal:number =
            (Number(order.sizePrice) || 0) +
            (Number(order.sugar)|| 0) +
            (Number(order.addonPrice) || 0);
        order.total = baseTotal * newQuantity;
      }
    }

  },
});

export const { addToMyOrders, clearMyOrders, removeOrder, updateQuantity } = myOrdersSlice.actions;
export default myOrdersSlice.reducer;
