import CheckoutSteps from '../components/CheckoutSteps';
import { setShipping, getShipping } from '../localStorage';
import { showMessage } from '../utils';

const ShippingScreen = {
  after_render: () => {
    document.getElementById('shipping-form').addEventListener('submit', (e) => {
      e.preventDefault();
      setShipping({
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postal-code').value,
        country: document.getElementById('country').value,
      });
      showMessage('Shipping Address Saved');
    });
  },
  render: () => {
    const shipping = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form">
          <li>
            <h1>Shipping</h1>
          </li>
          <li>
            <label for="address"> Address</label>
            <input type="text" name="address" id="address" value="${
              shipping.address
            }" />
          </li>        
          <li>
            <label for="city"> City</label>
            <input type="text" name="city" id="city" value="${shipping.city}" />
          </li>        
          <li>
            <label for="country"> Country</label>
            <input type="text" name="country" id="country" value="${
              shipping.country
            }" />
          </li>        
          <li>
            <label for="postal-code"> Postal Code</label>
            <input type="text" name="postal-code" id="postal-code" value="${
              shipping.postalCode
            }" />
          </li>        
          <li>
            <button type="submit" class="primary">Continue</button>
          </li>              
        </ul>
      </form>
    </div>
    `;
  },
};
export default ShippingScreen;
