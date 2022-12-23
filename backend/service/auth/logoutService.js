const { MODE } = require('../../config');
const logoutService = ({ res }) => {
  MODE.trim() === 'development'
    ? res.clearCookie('refreshToken')
    : res.clearCookie('refreshToken', { domain: '.raselofficial.me' });
  return Promise.resolve(true);
};

module.exports = logoutService;
