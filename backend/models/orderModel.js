import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
      },
    ],
    shipping: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    payment: {
      method: String,
    },
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: Date,
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;
