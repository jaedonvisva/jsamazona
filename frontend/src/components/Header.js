const Header = {
  render: () => {
    return `<div>
    <button class="ham-menu" id="aside-open-button">
      &#9776;
    </button>
    <a class="brand" href="/#">amazona</a>
  </div>
  <div>
          <ul>
            <li>
              <a href="/#/cart">Cart</a>
            </li>
            <li>
              <a href="/#/signin">Sign-In</a><!-- need to change link -->
            </li>
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
