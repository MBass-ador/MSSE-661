/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     Week 5
*/

/**
 *    login function
 * 
 * @param {*} e  - any errors
 */
const doLogin = async (e) => {
    // overide defaults and get login credentials from form
    e.preventDefault();
    const username = document.getElementById('formInputUsername').value;
    const password = document.getElementById('formInputPassword').value;
  
    // pull tokens from response response
    const res = await login({ username, password }).catch((err) => {
      alert('user login failed, please try again');
    });
    const { auth, access_token, refresh_token } = res;
  
    // save in browser
    setStorage('isAuth', auth);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);
  
    // go to home page
    window.location.href = 'home.html';
  };
  

  /**
   * register function
   * 
   * @param {*} e  - any errors
   */
  const doRegister = async (e) => {
    // overide defaults and get registration credentials from form
    e.preventDefault();
    const username = document.getElementById('formInputUsernameReg').value;
    const email = document.getElementById('formInputEmailReg').value;
    const password = document.getElementById('formInputPasswordReg').value;
  
    // build response
    const res = await register({
      username,
      email,
      password,
    });
    
    // go to login once registeration sent
    if (res) {
      window.location.href = '/';
    }
  };
  

  /**
   *    logout function
   * 
   * @param {*} e  - any errors
   */
  const doLogout = (e) => {
    // overide defaults
    e.preventDefault();
    // call logout
    logout();
    // go to login
    window.location.href = '/';
  };

  // IIFE
  (() => {
    if(storageHasData()) {
      const isAuth = getStorage('isAuth');
    
    if (!isAuth) {
      document.getElementById('logout').style.display = "none";
    } else {
      document.getElementById("logout").style.display = "block";
    }
  }
})();