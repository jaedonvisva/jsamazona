import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      required: true,
    },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0.0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);
export default Product;
