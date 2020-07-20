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

export const showMessage = (message, callback) => {
  const messageBox = document.getElementById('message-overlay');
  messageBox.innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
  messageBox.classList.add('active');
  const closeButton = document.getElementById('message-overlay-close-button');
  closeButton.focus();
  closeButton.addEventListener('click', () => {
    messageBox.classList.remove('active');
    if (callback) {
      callback();
    }
  });
};

export const redirectUser = () => {
  const cartItems = getCartItems();
  if (cartItems.length > 0) {
    document.location.hash = '/checkout';
  } else {
    document.location.hash = '/';
  }
};
