export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItems;
};

export const CleanCart = () => {
  localStorage.removeItem('cartItems');
};

export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
export const setShipping = (shipping) => {
  localStorage.setItem('shipping', JSON.stringify(shipping));
};
export const getShipping = () => {
  return localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : { address: '', city: '', country: '', postalCode: '' };
};
export const setPayment = (payment) => {
  localStorage.setItem('payment', JSON.stringify(payment));
};
export const getPayment = () => {
  return localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : { paymentMethod: 'paypal' };
};
export const getUserInfo = () => {
  console.log(localStorage.getItem('userInfo'));
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { name: '', email: '' };
  return userInfo;
};
export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  isAdmin = false,
  token = '',
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({ _id, name, email, isAdmin, token })
  );
};

export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
};
