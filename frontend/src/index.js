import Header from './components/Header.js';
import Aside from './components/Aside.js';
import Footer from './components/Footer.js';
import HomeScreen from './screens/HomeScreen.js';
import CartScreen from './screens/CartScreen.js';
import { parseRequestUrl, showLoading, hideLoading } from './utils.js';
import Error404 from './screens/Error404.js';
import ProductScreen from './screens/ProductScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SignoutScreen from './screens/SignoutScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import DashboardScreen from './screens/DashboardScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/product/:id/edit': ProductEditScreen,
  '/cart': CartScreen,
  '/cart/:id': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/signout': SignoutScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/productlist': ProductListScreen,
  '/dashboard': DashboardScreen,
};
const router = async () => {
  showLoading();
  const header = document.getElementById('header-container');
  const aside = document.getElementById('aside-container');
  const main = document.getElementById('main-container');
  const footer = document.getElementById('footer-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  aside.innerHTML = await Aside.render();
  await Aside.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();
  const request = parseRequestUrl();
  const parsedUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parsedUrl] || Error404;
  main.innerHTML = await screen.render();
  await screen.after_render();
  // await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  hideLoading();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
