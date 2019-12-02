const cacheHandler = (() => {
  let cache = {};
  return {
    addData: (url, json) => {
      cache[url] = {};
      cache[url].data = json;
      cache[url].time = Date.now();
    },
    getData: url => {
      if (cache[url]) {
        return cache[url];
      } else {
        return {}
      }
    }
    //getCurrentTime = () => Date.now()
  }
})();