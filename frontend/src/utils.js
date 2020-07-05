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
  const area = document.getElementById(`${areaName}-container`);
  area.innerHTML = await component.render();
  await component.after_render();
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
