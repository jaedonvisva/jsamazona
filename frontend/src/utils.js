export const parseRequestUrl = () => {
  const url = location.hash.slice(1).toLowerCase() || "/";
  const r = url.split("/");
  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
  };
};
