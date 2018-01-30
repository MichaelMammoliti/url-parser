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

export const getParameters = (url = window.location.search) => {
  const pattern = new RegExp(/[^&?]*?=[^&?]*/, 'g');

  return decodeURIComponent(url)
    .match(pattern)
    .reduce(reducerFn, {})
  ;
};

const URL = {
  getParameters,
};

export default URL;
