const { MODE } = require('../config');

/**
 * @params {name,value,options}
 */
const setCookie = ({
  name = 'refreshToken',
  value,
  options = {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 8760 * 60 * 60 * 1000, // 1 year,
    secure: true,
    ...(MODE.trim() !== 'development' && { domain: '.raselofficial.me' }),
  },
  res,
}) => {
  res.cookie(name.trim(), value, options);
  return Promise.resolve(true);
};

module.exports = {
  setCookie,
};
