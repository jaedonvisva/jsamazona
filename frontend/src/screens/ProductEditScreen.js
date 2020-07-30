const {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
} = require('../utils');
const { getProduct, updateProduct } = require('../api');
const { default: DashboardMenu } = require('../components/DashboardMenu');

const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document
      .getElementById('edit-product-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          category: document.getElementById('category').value,
          brand: document.getElementById('brand').value,
          image: document.getElementById('image').value,
          countInStock: document.getElementById('countInStock').value,
          description: document.getElementById('description').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          document.location.hash = '/productlist';
        }
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: 'products' })}
      <div class="dashboard-content">
        <div> 
          <h1>Edit Product ${product._id}</h1>
        </div>
        <div class="form">
          <form id="edit-product-form">
            <ul class="form-items">
              <li>
                <label for="name">Name: </label>
                <input type="text" name="name" 
                value="${product.name}" id="name" />
              </li>
              <li>
                <label for="price">Price: </label>
                <input type="text" name="price" 
                value="${product.price}" id="price" />
              </li>
              <li>
                <label for="brand">Brand: </label>
                <input type="text" name="brand" 
                value="${product.brand}" id="brand" />
              </li>
              <li>
                <label for="category">Category: </label>
                <input type="text" name="category" 
                value="${product.category}" id="category" />
              </li>
              <li>
                <label for="image">Image: </label>
                <input type="text" name="image" 
                value="${product.image}" id="image" />
              </li>
              <li>
                <label for="countInStock">Count In Stock: </label>
                <input type="text" name="countInStock" 
                value="${product.countInStock}" id="countInStock" />
              </li>
              <li>
                <label for="description">Description: </label>
                <input type="text" name="description" 
                value="${product.description}" id="description" />
              </li>

              <li>
                
                <button class="primary" type="submit">Update</button>
              </li> 
            </ul>
          </form>
        </div>
      </div>
    </div>
    `;
  },
};
export default ProductEditScreen;
