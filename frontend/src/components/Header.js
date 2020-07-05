import dayjs from 'dayjs';
import { getUserInfo } from '../utils.js';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return `<div>
    <button class="ham-menu" id="aside-open-button">
      &#9776;
    </button>
    <a class="brand" href="/#">amazona</a>
  </div>
  <div>
  <a href="#">
    Today : ${dayjs().format('YYYY-MM-DD')}
    </a>
  </div>
  <div>
    <ul>
    ${
      name
        ? `
    <li><a href="/#/profile">${name}</a></li>
    <li><a href="/#/cart">Cart</a></li>
    `
        : `
    <li><a href="/#/cart">Cart</a></li>
    <li><a href="/#/signin">Sign-In</a></li>
    `
    }
    
    </ul>
  </div>`;
  },
  after_render: () => {
    document
      .getElementById('aside-open-button')
      .addEventListener('click', () => {
        document.getElementById('aside-container').classList.add('open');
      });
  },
};
export default Header;
