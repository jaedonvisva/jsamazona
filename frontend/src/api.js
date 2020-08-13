import axios from 'axios';
import { apiUrl } from './config.js';
import { getUserInfo } from './localStorage.js';

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const createProduct = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const updateProduct = async (product) => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in getProducts', err);
    return { error: err.message };
  }
};

export const getOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in getOrder', err);
    return { error: err.message };
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${apiUrl}/api/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in getProduct', err);
    return { error: err.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error) {
    return { error };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (response.status !== 201) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in register', err.message);
    return { error: err.message };
  }
};
export const getOrders = async () => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return err.response ? err.response.data.message : err.message;
  }
};

export const getMyOrders = async () => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders/mine`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return err.response ? err.response.data.message : err.message;
  }
};

export const updateProfile = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    console.log(getUserInfo());
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err.response);
    return { error: err.response ? err.response.data.message : err.message };
  }
};
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${apiUrl}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    console.log('Error in delete product', err.message);
    return { error: err.message };
  }
};
