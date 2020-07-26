import { createProduct } from '../api';

const ProductListScreen = {
  after_render: () => {
    document
      .getElementById('create-product-button')
      .addEventListener('click', async () => {
        const data = await createProduct();
        alert(data.product._id);
      });
  },
  render: () => {
    return `
    <div>
      <h1>Products</h1>
      <button id="create-product-button">Create Product</button>
    </div>`;
  },
};

export default ProductListScreen;
