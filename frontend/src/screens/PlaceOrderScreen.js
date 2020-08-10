import {
  getCartItems,
  getShipping,
  getPayment,
  CleanCart,
} from '../localStorage.js';
import CheckoutSteps from '../components/CheckoutSteps';
import { showLoading, hideLoading, showMessage } from '../utils';
import { createOrder } from '../api.js';

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
  after_render: () => {
    document
      .getElementById('placeorder-button')
      .addEventListener('click', async () => {
        const order = convertCartToOrder();
        showLoading();
        const data = await createOrder(order);
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          CleanCart();
          document.location.hash = `/order/${data.order._id}`;
        }
      });
  },
  render: async () => {
    const order = convertCartToOrder();
    return `
    <div>
      ${CheckoutSteps.render({
        step1: true,
        step2: true,
        step3: true,
        step4: true,
      })}
      <div class="placeorder">
        <div class="placeorder-info">
          <div>
            <h2>Shipping</h2>
            <div>
              Address: ${order.shipping.address}, ${order.shipping.city},
              ${order.shipping.postalCode}, ${order.shipping.country}
            </div>
          </div>   
          <div>
            <h2>Payment</h2>
            <div>
              Method: ${order.payment.paymentMethod}
            </div>
          </div>
          <div>
            <h2>Items</h2>
            <ul class="cart-list">               
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
                    Qty: ${item.qty}
                  </div>
                </div>
                <div class="cart-price">$${item.price}</div>
              </li>`
                      )
                      .join('\n')
              }
            </ul>
          </div>        
        </div>  
        <div class="placeorder-action">
          <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div>Items</div>
                <div>$${order.itemsPrice}</div>
              </li>
              <li>
                <div>Shipping</div>
                <div>$${order.shippingPrice}</div>
              </li>
              <li>
                <div>Tax</div>
                <div>$${order.taxPrice}</div>
              </li>
              <li class="total">
                <div>Order Total</div>
                <div>$${order.totalPrice}</div>
              </li> 
              <li>
                 <button class="primary fw" id="placeorder-button">Place Order</button>
              </li>                                                     
          </ul>
        </div>
      </div>`;
  },
};
export default PlaceOrderScreen;
