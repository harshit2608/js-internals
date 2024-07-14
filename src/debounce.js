const debounce = (fn, delay = 0) => {
  let timerID;
  return (...args) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

module.exports = debounce;
