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

export const get = keyName => {
  const params = getAll();

  if (keyName === undefined) return params;

  return params[keyName];
};

const URL = {
  get,
  getAll,
};

export default URL;
