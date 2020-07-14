const Aside = {
  render: () => {
    return `<div class="aside-header">
    <div>SHOP BY CATEGORY</div>
    <button class="aside-close-button" id="aside-close">x</button>
  </div>
  <div class="aside-body">
    <ul class="categories">
      <li>
        <a href="/category/shirts"
          >Shirts<span><i class="fa fa-chevron-right"></i></span
        ></a>
      </li>
      <li>
        <a href="/category/pants"
          >Pants<span><i class="fa fa-chevron-right"></i></span
        ></a>
      </li>
      <li>
        <a href="/category/t-shirts"
          >T-Shirts<span><i class="fa fa-chevron-right"></i></span
        ></a>
      </li>
      <li>
        <a href="/category/shoes"
          >Shoes<span><i class="fa fa-chevron-right"></i></span
        ></a>
      </li>
    </ul>
  </div>`;
  },
  after_render: () => {
    document.getElementById('aside-container').classList.remove('open');
    document.getElementById('aside-close').addEventListener('click', () => {
      document.getElementById('aside-container').classList.remove('open');
    });
  },
};
export default Aside;
