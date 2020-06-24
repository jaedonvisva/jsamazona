import { getCartItems } from '../localStorage.js';

const CartScreen = {
  after_render: () => {},
  render: () => {
    const cartItems = getCartItems();
    return `
    <div class="cart">
      <ul>
        <li>
          <h3>Shopping Cart</h3>
        </li>
        ${
          !cartItems.length
            ? `<li>Cart is empty. <a href="/#/">Go Shopping</a></li>`
            : `<li>Items</li>`
        }
      </ul>  
    </div>`;
  },
};
export default CartScreen;
