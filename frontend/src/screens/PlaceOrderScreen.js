import { getCartItems, getShipping, getPayment } from '../localStorage.js';

const convertCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = '/cart';
  }
  const shipping = getShipping();
  if (!shipping.address) {
    document.location.hash = '/shipping';
  }
  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.hash = '/payment';
  }
  const itemsPrice = orderItems.reduce((a, c) => c.price * c.qty + a, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
const PlaceOrderScreen = {
  after_render: () => {},
  render: async () => {
    const order = convertCartToOrder();
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
          !order.orderItems.length
            ? `<li><div>Cart is empty. <a href="/#/">Go Shopping</a></div></li>`
            : order.orderItems
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
                      ${[...Array(item.countInStock).keys()]
                        .map((x) =>
                          item.qty === x + 1
                            ? `<option value="${x + 1}" selected>${
                                x + 1
                              }</option>`
                            : `<option value="${x + 1}">${x + 1}</option>`
                        )
                        .join('\n')}
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
          Subtotal (${order.orderItems.reduce(
            (a, c) => a + c.qty,
            0
          )} items): $${order.orderItems.reduce((a, c) => {
      return c.price * c.qty + a;
    }, 0)}
        </h3>
        <button id="checkout-button" class="primary fw">
          Place Order
        </button>
      </div>
    </div>`;
  },
};
export default PlaceOrderScreen;
