import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    address: { type: Object, required: false, default: {} },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    orderList: { type: Array, required: true },
    orderStatus: { type: Number, required: true },
    paymentServiceMode: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
