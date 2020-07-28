import { createProduct, getProducts, deleteProduct } from '../api';
import { showLoading, hideLoading, rerender } from '../utils.js';

const ProductListScreen = {
  after_render: () => {
    document
      .getElementById('create-product-button')
      .addEventListener('click', async () => {
        const data = await createProduct();
        alert(data.product._id);
        rerender(ProductListScreen);
      });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure to delete this product?')) {
          showLoading();
          console.log(deleteButton.id);
          await deleteProduct(deleteButton.id);
          hideLoading();
          rerender(ProductListScreen);
        }
      });
    });
  },
  render: async () => {
    const products = await getProducts();
    return `
    <div>
      <h1>Products</h1>
      <button id="create-product-button">Create Product</button>
      <div class="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th class="tr-action">ACTION</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(
              (product) => `
            <tr>
              <td>${product._id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.category}</td>
              <td>${product.brand}</td>
              <td>
                <button id="${product._id}" class="edit-button">Edit</button> 
                <button id="${product._id}" class="delete-button">Delete</button>
              </td>
            </tr>
            `
            )}
          </tbody>
      </div>
    </div>`;
  },
};

export default ProductListScreen;
