import { parseRequestUrl } from '../utils.js';
import { getProduct } from '../api.js';
import Rating from '../components/Rating.js';

const ProductScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="product-page">
    <li>
      <h1>${product.name}</h1>
      <div>
        ${Rating.render({
          value: product.rating,
          text: product.numReviews + ' Reviews',
        })}
      </div>
      <p>Price: $${product.price}</p>
      <p>Description: ${product.description}</p>
      <li>Qty:
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </li>
      </li>
      <img class="product-image" src="${product.image}" alt="${product.name}" />
    </div>`;
  },
};
export default ProductScreen;
