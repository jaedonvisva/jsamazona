import Rating from '../components/Rating.js';

const HomeScreen = {
  render: async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();
    return `<div>
    <ul class='products'>
    ${products
      .map(
        (product) => `
        <li> 
        <div class="product">
        <a href="/#/product/${product._id}">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
        />
        <div class="product-name">
          <a href="/#/product/${product._id}">
            ${product.name}
          </a>
        </div>
        <div class="product-brand">${product.brand}</div>
        <div class="product-price"><span>$</span>${product.price}</div>
        <div class="product-rating">
          ${Rating.render({
            value: product.rating,
            text: product.numReviews + ' Reviews',
          })}
        </div>
      </div>
      </li>`
      )
      .join('\n')}
    </ul>
    </div>`;
  },
  after_render: () => {},
};
export default HomeScreen;
