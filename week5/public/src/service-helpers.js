/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     Updated for Week 5
*/

// token storage
const access_token = storageHasData() ? getStorage('access_token') : '';
const token = `Bearer ${access_token}`;

// HTTP GET
const _get = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};


// HTTP POST
const _post = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};


// HTTP PUT
const _put = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
