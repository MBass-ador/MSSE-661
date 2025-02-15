/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Updated for Week 5
*/

// location of back-end user and login APIs
const AUTH_API = `${BASE_API_URL}/auth`;          // http://localhost:3000/api/auth
const USER_API = `${BASE_API_URL}/user`;         // http://localhost:3000/api/user

// returns path to auth api for registration    // http://localhost:3000/api/auth/register
const register = (formData) => _post(`${AUTH_API}/register`, formData); 


// returns path to user api for login         // http://localhost:3000/api/user/login
const login = (formData) => _post(`${AUTH_API}/login`, formData); 


// clears tokens from local storage
const logout = () => {
  clearStorage('isAuth');
  clearStorage('access_token');
  clearStorage('refresh_token');
};