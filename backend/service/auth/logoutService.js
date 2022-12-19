const logoutService = ({ res }) => {
  res.clearCookie('refreshToken');
  return Promise.resolve(true);
};

module.exports = logoutService;
