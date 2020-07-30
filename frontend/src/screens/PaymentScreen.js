import CheckoutSteps from '../components/CheckoutSteps';
import { setPayment, getPayment } from '../localStorage';

const PaymentScreen = {
  after_render: () => {
    document.getElementById('payment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const paymentMethod = document.querySelector(
        'input[name="payment-method"]:checked'
      ).value;
      setPayment({
        paymentMethod,
      });
      document.location.hash = '/placeorder';
    });
  },
  render: () => {
    const payment = getPayment();
    console.log(payment.paymentMethod);
    return `
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
    <div class="form-container">
      <form id="payment-form">
        <ul class="form">
          <li>
            <h1>Payment</h1>
          </li>
          <li>
            <div>             
              <input type="radio" name="payment-method" id="paypal" value="paypal" 
                ${payment.paymentMethod === 'paypal' ? 'checked' : ''}   />
              <label for="paypal">PayPal</label>
            </div>   
          </li>
          <li>
            <div>
              <input type="radio" name="payment-method" id="stripe" value="stripe" 
                ${payment.paymentMethod === 'stripe' ? 'checked' : ''}   />
              <label for="stripe">Stripe</label>
            </div>
          <li>
                    
            <button type="submit" class="primary">Continue</button>
          </li>              
        </ul>
      </form>
    </div>
    `;
  },
};
export default PaymentScreen;
