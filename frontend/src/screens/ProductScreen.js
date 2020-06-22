import { parseRequestUrl } from '../utils.js';
import { getProduct } from '../api.js';

const ProductScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `<div><h1>${product.name}</h1>
    <img src="${product.image}" alt="${product.name}" />
    </div>`;
  },
};
export default ProductScreen;
