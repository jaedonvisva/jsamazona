import Header from './components/Header.js';
import Aside from './components/Aside.js';
import Footer from './components/Footer.js';
import HomeScreen from './screens/HomeScreen.js';
import CartScreen from './screens/CartScreen.js';
import { parseRequestUrl } from './utils.js';
import Error404 from './screens/Error404.js';

const routes = {
  '/': HomeScreen,
  '/cart': CartScreen,
  '/cart/:id': CartScreen,
};
const router = async () => {
  const header = document.getElementById('header-container');
  const aside = document.getElementById('aside-container');
  const content = document.getElementById('content-container');
  const footer = document.getElementById('footer-container');
  header.innerHTML = Header.render();
  Header.after_render();
  aside.innerHTML = Aside.render();
  Aside.after_render();
  footer.innerHTML = Footer.render();
  Footer.after_render();
  // content.innerHTML = `<div>Will be done later</div>`;
  const request = parseRequestUrl();
  const parsedUrl =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');
  const screen = routes[parsedUrl] || Error404;
  content.innerHTML = await screen.render();
  screen.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
