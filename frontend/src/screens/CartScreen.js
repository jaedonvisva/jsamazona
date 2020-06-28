import { getCartItems, setCartItems } from '../localStorage.js';
import { parseRequestUrl, rerender } from '../utils.js';
import { getProduct } from '../api.js';

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      console.log('add it to cart', request.id);
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="cart">
      <ul class="cart-list">
        <li>
          <h3>Shopping Cart</h3>
          <div>
            Price
          </div>
        </li>
        ${
          !cartItems.length
            ? `<li>Cart is empty. <a href="/#/">Go Shopping</a></li>`
            : cartItems
                .map(
                  (item) => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}"/>
              </div>
              <div class="cart-name">
                  <div>
                    <a href="/#/product/${item.product}">${item.name}</a>
                  </div>
                  <div>
                    Qty:
                    <select class="qty-select" value="${item.qty}" id="${
                    item.product
                  }">
                      ${
                        // 5 => [0,1,2,3,4]
                        [...Array(item.countInStock).keys()]
                          .map((x) =>
                            item.qty === x + 1
                              ? `<option value="${x + 1}" selected>${
                                  x + 1
                                }</option>`
                              : `<option value="${x + 1}">${x + 1}</option>`
                          )
                          .join('\n')
                      }
                    </select>
                    <button type="button" class="delete-button"
                      id="${item.product}">
                      Delete
                    </button>
                  </div>
              </div>
              <div class="cart-price">$${item.price}</div>
            </li>`
                )
                .join('\n')
        }
      </ul>
      <div class="cart-action">
        <h3>
          Subtotal : $100
        </h3>
        <button id="checkout-button" class="primary fw">
          Proceed to Checkout
        </button>
      </div>
    </div>`;
  },
};
export default CartScreen;
