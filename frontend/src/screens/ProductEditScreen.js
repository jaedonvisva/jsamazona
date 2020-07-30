const { parseRequestUrl } = require('../utils');
const { getProduct } = require('../api');
const { default: DashboardMenu } = require('../components/DashboardMenu');

const ProductEditScreen = {
  after_render: () => {},
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
