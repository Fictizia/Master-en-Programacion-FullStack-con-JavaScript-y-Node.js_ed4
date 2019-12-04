const cacheHandler = (() => {
  let enabledMemoryStorage = true;
  let enabledLocalStorage = false;

  let memoryStorage = {};

  const setDataInLocalStorage = (url, data) => window.localStorage.setItem(url, JSON.stringify({data: data, time: Date.now()}))
  const setDataInMemoryStorage = (url, data) => memoryStorage[url] = JSON.stringify({data: data, time: Date.now()})
  const getDataFromLocalStorage = url => JSON.parse(window.localStorage.getItem(url))
  const getDataFromMemoryStorage = url => JSON.parse(memoryStorage[url])
  return {
    isEnabledLocalStorage: () => enabledLocalStorage,
    enableLocalStorage: () => enabledLocalStorage = true,
    disableLocalStorage: () => enabledLocalStorage = false,
    isEnabledMemoryStorage: () => enabledMemoryStorage,
    enableMemoryStorage: () => enabledMemoryStorage = true,
    disableMemoryStorage: () => enabledLocalStorage = false,
    setData: (url, data) => cacheHandler.isEnabledLocalStorage() ? setDataInLocalStorage(url, data) : setDataInMemoryStorage(url, data),
    getData: url => cacheHandler.isEnabledLocalStorage() ? getDataFromLocalStorage(url) : getDataFromMemoryStorage(url)
  }
})();