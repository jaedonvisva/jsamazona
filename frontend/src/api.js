import { apiUrl } from './config.js';

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
