/** @function */
const dataHandler = (() => {
  const refreshPeriod = 20 * 1000;
  const getData = async (url, cb) => {
    let response = await fetch(url);
    let json = await response.json();
    cacheHandler.addData(url, json);
    cb(json);
  }
  const isGithubRequest = url => {
    return url.indexOf('https://api.github.com') == 0;
  }
  const getGitHubData = (url, cb) => {
    const cacheData = cacheHandler.getData(url);
    if (cacheData) {
      if (Date.now() - cacheData.time < refreshPeriod) {
        cb(cacheData.data);
        return;
      }
    }
    searchGitHubData(url, cb);
  }
  const searchGitHubData = async (url, cb) => {
    const rateLimitUrl = "https://api.github.com/rate_limit";
    let response = await fetch(rateLimitUrl);
    let json = await response.json();
    if (json.resources.search.remaining > 0) {
      getData(url, cb);
      return;
    }
    const timeout = json.resources.search.reset*1000 - Date.now();
    setTimeout(searchGitHubData(url, cb), timeout > 0 ? timeout: 0);
  }
  return {
    get: (url, cb) => {
      if (isGithubRequest(url)) {
        getGitHubData(url, cb);
      } else {
        getData(url, cb);
      }
    }
  }
})();