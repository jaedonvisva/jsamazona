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
