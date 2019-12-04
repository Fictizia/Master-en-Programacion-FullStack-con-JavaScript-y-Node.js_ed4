/** @function */
const dataHandler = (() => {
  const getData = async (url, callback) => {
    let response = await fetch(url);
    let json = await response.json();
    cacheHandler.setData(url, json);
    callback(json);
  }
  const isGithubRequest = url => {
    return url.indexOf('https://api.github.com') == 0;
  }
  const searchGitHubData = async (url, cacheData, callback) => {
    const rateLimitUrl = "https://api.github.com/rate_limit";
    let response = await fetch(rateLimitUrl);
    let json = await response.json();
    if (json.resources.search.remaining > 0) {
      getData(url, callback);
      return;
    } else if (cacheData) {
      callback(cacheData.data);
      return;
    }
    const MILLISECONDS_TO_NEXT_SEARCH = json.resources.search.reset*1000 - Date.now();
    const timeout = MILLISECONDS_TO_NEXT_SEARCH > 0 ? MILLISECONDS_TO_NEXT_SEARCH : 0;
    setTimeout(searchGitHubData(url, callback), timeout);
  }
  const MILLISECONDS_CACHE_DATA_EXPIRATION = 20 * 1000;
  const areFreshCacheData = cacheDataTime => {
    const MILLISECONDS_FROM_LAST_SEARCH = Date.now() - cacheDataTime;
    return MILLISECONDS_FROM_LAST_SEARCH < MILLISECONDS_CACHE_DATA_EXPIRATION; 
  }
  const getOnLineData = (url, cacheData, callback) => 
    cacheData && areFreshCacheData(cacheData.time) ? callback(cacheData.data) : searchData(url, cacheData, callback)
  const searchData = (url, cacheData, callback) => isGithubRequest(url) ? searchGitHubData(url, cacheData, callback) : getData(url, callback)
  const getOffLineData = (url, cacheData, callback) => cacheData ? callback(cacheData.data) : notifyNoConnection()
  const notifyNoConnection = () => console.log ('Internet connection doesn\'t work')
  return {
    get: (url, callback) => {
      const cacheData = cacheHandler.getData(url);
      navigator.onLine ? getOnLineData(url, cacheData, callback) : getOffLineData(url, cacheData, callback);
    }
  }
})();