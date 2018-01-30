const getValue = string => {
  const integer = +string;

  if (!string) return undefined;

  if (string === 'false') return false;
  if (string === 'true') return true;

  return isNaN(integer) ? string : integer;
};

const reducerFn = (acc, value) => {
  const s = value.split('=');

  if (!s[1]) return acc;

  return { ...acc, [s[0]]: getValue(s[1]) };
};

export const getAll = (url = window.location.search) => {
  const pattern = new RegExp(/[^&?]*?=[^&?]*/, 'g');

  const matches = decodeURIComponent(url).match(pattern) || [];

  return matches.reduce(reducerFn, {});
};

export const get = parameter => {
  const params = getAll();

  if (parameter === undefined) return params;

  return Object.keys(params).filter(key => key === parameter)[0];
};

const URL = {
  get,
  getAll,
};

export default URL;
