import { parseRequestUrl } from '../utils.js';
import { getProduct } from '../api.js';
import Rating from '../components/Rating.js';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div>
      <div class="back-to-result">
        <a href="/#/">Back to result</a>
      </div>
      <div class="details">
          <div class="details-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
                ${Rating.render({
                  value: product.rating,
                  text: `${product.numReviews} reviews`,
                })}
              </li>
              <li>
                Price: <strong>$${product.price}</strong>
              </li>
              <li>
                Description:
                <div>
                  ${product.description}
                </div>
              </li>
            </ul>
          </div>
          <div class="details-action">
                <ul>
                  <li>
                    Price: $${product.price}
                  </li>
                  <li>
                    Status: 
                    ${
                      product.countInStock > 0
                        ? `<span class="success">In Stock</span>`
                        : `<span class="error">Unavailable</span>`
                    }
                  </li>
                  <li>
                    <button id="add-button" class="primary fw">Add to Cart</button>
                  </li>
                </ul>
          </div>          
      </div>
      <div>
            <h2>Reviews</h2>
            ${!product.reviews.length ? `<div>There is no review.</div>` : ''}
            <ul class="reviews">
              ${product.reviews
                .map(
                  (review) => `
                <li>
                  <div><b>${review.name}</b></div>
                  <div>${Rating.render({ value: review.rating })}</div>
                  <div>${review.createdAt}</div>
                  <div>${review.comment}</div>
                </li>
                `
                )
                .join('\n')}
              
            </ul>
          </div>
    </div>
        `;
  },
};
export default ProductScreen;
