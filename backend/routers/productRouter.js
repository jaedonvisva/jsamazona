import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
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
