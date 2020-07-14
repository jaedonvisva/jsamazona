import { getCartItems } from './localStorage';

export const parseRequestUrl = () => {
  const url = document.location.hash.slice(1).toLowerCase() || '/';
  const r = url.split('/');
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
  };
};

export const rerender = async (component, areaName = 'main') => {
  const area = document.getElemEentById(`${areaName}-container`);
  area.innerHTML = await component.render();
  await component.after_render();
};

export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
};
export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active');
};

export const redirectUser = () => {
  const cartItems = getCartItems();
  if (cartItems.length > 0) {
    document.location.hash = '/checkout';
  } else {
    document.location.hash = '/';
  }
};
