// eslint-disable-next-line import/prefer-default-export
export const mediaPreload = url => new Promise((resolve, reject) => {
  const req = new window.XMLHttpRequest();
  req.open('GET', url, true);
  req.responseType = 'blob';

  req.onload = () => {
    // Onload is triggered even on 404
    // so we need to check the status code
    if (req.status === 200) {
      const videoBlob = req.response;
      const vid = window.URL.createObjectURL(videoBlob); // IE10+
      // Video is now downloaded
      // and we can set it as source on the video element
      return resolve(vid);
    }

    return true;
  };
  req.onerror = (x) => {
    reject(x);
  };
  req.send();
});

