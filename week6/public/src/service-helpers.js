/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     Updated for Week 5
*/

const { response } = require("express");

// token storage
const access_token = storageHasData() ? getStorage('access_token') : '';
const token = `Bearer ${access_token}`;


// declare default options
const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const DEFAULT_OPTIONS_WITH_AUTH = {
  headers: {
    Authorization: token,
    'Content-Type': 'application/json',
  },
};

// not used yet??????
const OPTIONS_WITH_AUTH = {
  headers: {
    Authorization: token,
  },
};


/**
 * HTTP GET (generic Read API handler)
 * 
 * @param {*} url     - address to receive request
 * @param {*} options - default options (defined above)
 * @returns           - url and header options 
 */
const _get = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  const response = await fetch(url, {
    method: 'GET',
    ...options
  });
  return response.json();
};


/**
 * HTTP POST (generic create API handler)
 * 
 * @param {*} url       - address to receive request
 * @param {*} data      - request data
 * @param {*} options   - default options (defined above)
 * @returns             - response json object
 */
const _post = async (url, data, options = DEFAULT_OPTIONS) => {
  const response = await fetch(url, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data)
  });
  return response.json();
};

/**
 * HTTP PUT (generic Read API handler)
 * 
 * @param {*} url       - address to receive request
 * @param {*} data      - request data
 * @param {*} options   - default options (defined above)
 * @returns             - response json object
 */
const _put = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  const response = await fetch(url, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(data)
  });
  return response.json();
}


/**
 * HTTP DELETE (generic Delete API handler)
 * 
 * @param {*} url       - address to receive request
 * @param {*} options   - default options (defined above)
 * @returns             - response json object
 */
const _delete = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  const response = await fetch(url, {
    method: 'DELETE',
    ...options
  });
  return response.json();
};