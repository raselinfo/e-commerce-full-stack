const { MODE } = require('../config');

/**
 * @params {name,value,options}
 */
// Documentation
// This setCookie function basically set the cookie with given data=> name,value:token,options

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
  console.log('Set Cookie 🥰');
  return true;
};

module.exports = {
  setCookie,
};
