import {
  getCartItems,
  getShipping,
  getPayment,
  CleanCart,
} from '../localStorage.js';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  showLoading,
  hideLoading,
  showMessage,
  parseRequestUrl,
} from '../utils';
import { createOrder, getOrder } from '../api.js';

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
const OrderScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const order = await getOrder(request.id);
    console.log(order);
    return `
    <div>
      <div class="placeorder">
        <div class="placeorder-info">
        
        <h1>Order ${order._id}</h1>
          <div>
            <h2>Shipping</h2>
            <p>
              Address: ${order.shipping.address}, ${order.shipping.city},
              ${order.shipping.postalCode}, ${order.shipping.country}
            </p>
            <p>
              ${
                order.isDelivered
                  ? `<div class="success">Delivered</div>`
                  : `<div class="error">Not Delivered</div>`
              }
            </p>
          </div>   
          <div>
            <h2>Payment</h2>
            <p>
              Method: ${order.payment.paymentMethod}
            </p>
            <p>
            ${
              order.isPaid
                ? `<div class="success">Paid</div>`
                : `<div class="error">Not Paid</div>`
            }
          </p>
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
                                                              
          </ul>
        </div>
      </div>`;
  },
};
export default OrderScreen;
