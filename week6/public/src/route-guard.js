// routes enforced based on isAuth value from browser storage
(() => {
  const isAuth = getStorage('isAuth');
  if (!isAuth) {
    logout();
    alert('log in to view test register');
    // return to login page (index.html)
    window.location.href = '/index.html';
  }
})();