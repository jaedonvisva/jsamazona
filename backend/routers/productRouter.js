import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAuth } from '../utils';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        rating: req.body.rating,
        comment: req.body.comment,
        username: req.user.name,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      product.numReviews = product.reviews.length;
      const updatedProduct = await product.save();
      res.send({ message: 'Review Added', product: updatedProduct });
    }
  })
);

productRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name || 'sample product',
      description: req.body.description || 'sample description',
      category: req.body.category || 'sample category',
      brand: req.body.brand || 'sample brand',
      image: req.body.image || '/images/product-1.jpg',
      price: req.body.price || 0,
      countInStock: req.body.countInStock || 0,
    });
    const createdProduct = await product.save();
    res.status(201).send({
      message: 'Product Created Successfully.',
      product: createdProduct,
    });
  })
);

productRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.image = req.body.image;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;

    const updatedProduct = await product.save();
    res.send({
      message: 'Product Updated Successfully.',
      product: updatedProduct,
    });
  })
);

productRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  })
);

export default productRouter;
