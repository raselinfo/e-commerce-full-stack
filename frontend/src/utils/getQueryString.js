/**
 * 
 * @param {Array} quires []
 * @returns {Object} Object{}
 */

const getQueryString = (quires = []) => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  const allQuires = quires.reduce((acc, item) => {
    acc[item] = parameters.get("redirect") ?? "/";
    return acc;
  }, {});

  return allQuires;
};


export default getQueryString