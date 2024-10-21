const BASE_URL = 'http://localhost:5000/';

const fetchData = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
const awaitresponse = await response.json();
console.log(awaitresponse);
  return awaitresponse;
};

const deleteData = async (endpoint) => {
  const token = localStorage.getItem('token');

  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
};

export default { fetchData, deleteData }; 
