const imagesHandler = (() => {
  let enabledCacheImage = false; 
  const getCacheImageSrc = url => {
    const cacheData = cacheHandler.getData(url);
    return cacheData 
      ? cacheData.data 
      : (convertImgToBase64URL (url, base64Img => {cacheHandler.setData(url, base64Img)}), url); 
  }
  const convertImgToBase64URL = (url, callback) => {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    eventListenerHandler.listenLoadedImage(image, () => {
      let canvas = document.createElement('canvas');
      let canvasContext = canvas.getContext('2d');
      canvas.height = image.height;
      canvas.width = image.width;
      canvasContext.drawImage(image, 0, 0);
      let dataURL = canvas.toDataURL();
      callback(dataURL);
      canvas = null;
    });
    image.src = url;
  }
  return {
    isEnabledCacheImage: () => enabledCacheImage, 
    enableCacheImage: () => enabledCacheImage=true,
    disableCacheImage: () => enabledCacheImage=false,
    getImageSrc: url => imagesHandler.isEnabledCacheImage() ? getCacheImageSrc(url) : url
  }
})();