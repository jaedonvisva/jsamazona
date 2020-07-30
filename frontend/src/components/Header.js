import dayjs from 'dayjs';
import { getUserInfo } from '../localStorage.js';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
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
    <li>
      <div class="dropdown">
        <a href="/#/profile">${name}</a>
        <ul class="dropdown-content">
          <li><a href="/#/profile">Profile</a></li>
          <li><a href="/#/signout">Sign Out</a></li>
        </ul>
      </div>
    </li>
    <li><a href="/#/cart">Cart</a></li>
    ${isAdmin ? `<li><a href="/#/dashboard">Dashboard</a></li>` : ''}
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
