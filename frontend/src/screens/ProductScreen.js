import {
  parseRequestUrl,
  showMessage,
  showLoading,
  hideLoading,
  rerender,
} from '../utils.js';
import { getProduct, createReview } from '../api.js';
import Rating from '../components/Rating.js';
import ProfileScreen from './ProfileScreen.js';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    const addButton = document.getElementById('add-button');
    if (addButton) {
      addButton.addEventListener('click', () => {
        document.location.hash = `/cart/${request.id}`;
      });
    }
    document
      .getElementById('review-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const result = await createReview(request.id, {
          comment: document.getElementById('comment').value,
          rating: Number(document.getElementById('rating').value),
        });
        if (result.error) {
          showMessage(result.error);
        } else {
          showMessage(result.message);
        }
        rerender(ProductScreen);
        hideLoading();
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      showMessage(`Server Error: ${product.error}`);
      return `<div></div>`;
    }
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
                  <div><b>${review.username}</b></div>
                  <div>${Rating.render({ value: review.rating })}</div>
                  <div>${review.createdAt}</div>
                  <div>${review.comment}</div>
                </li>
                `
              )
              .join('\n')}              
          </ul>
          <form class="form" id="review-form">
                <ul >
                  <li>
                    <label for="rating">Rating</label>
                    <select name="rating" id="rating">
                      <option>Select...</option>
                      <option value="1">Poor</option>
                      <option value="2">Fair</option>
                      <option value="3">Good</option>
                      <option value="4">Very Good</option>
                      <option value="5">Exellent</option>                      
                    </select>
                  </li>
                  <li>
                    <label for="comment">Comment</label>
                    <textarea name="comment" id="comment"></textarea>
                  </li>
                  <li>
                    <button type="submit" class="primary">Submit</button>
                  </li>
                </ul>
          </form>
        </div>
    </div>
        `;
  },
};
export default ProductScreen;
