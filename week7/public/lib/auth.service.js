/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Updated for Week 7
*/

// location of back-end user and login APIs
const AUTH_API = `${BASE_API_URL}/auth`;   // http://localhost:3000/api/auth
const USER_API = `${BASE_API_URL}/user`;  // http://localhost:3000/api/user


/**
 * @class AuthService
 * * AuthService class to handle authentication
 */
class AuthService {

  /**
  *  register new user
  * 
  * @param {Object} formData - form dagta from registration form
  * @returns  -   path to auth api for registration
  *               http://localhost:3000/api/auth/register
  */               
  register = (formData) => _post(`${AUTH_API}/register`, formData); 


  /**
  *  logs in user
  * 
  * @param {Object} formData - form dagta from login form
  * @returns -   path to auth api for login
   *              http://localhost:3000/api/auth/login
  */
  login = (formData) => _post(`${AUTH_API}/login`, formData);


  /**
   *  sets expire time for token
   * 
   * @param {Number} expiresIn - time in seconds for token to expire
   * @returns     -  date object for expiration time
   */
  setExpiration = (expiresIn) => 
    new Date(new Date().getTime() + expiresIn * 1000);


  /**
  * checks authentication status
  * 
  * @returns -   boolean 
  *              whether user is authenticated
  */
  isAuth = () => {
    return getStorage('access_token');
  }

  /**
  * checks token expiration
  * using "expires_in" value from local storage
  * and the token itself
  */
  isTokenExpired() {
    const expireDate = getStorage('expires_in');
    const isExpired = expireDate === new Date();

    if (isExpired) {
      localStorage.clear();
    }
    return isExpired;
  };

  /**
  * logs out user
  * clears local storage
  * redirects back to index.html (login page)
  */
  logout = () => {
    localStorage.clear();
    window.location.href = '/index.html';
  };

}

// new instance of AuthService
const authService = new AuthService();