// routes enforce valid authToken
(() => {
    // cut off routes to browser w no authToken
    if (storageHasData() && !getStorage('isAuth')) {
      logout();
      window.location.href = '/index.html';
    }
  })();