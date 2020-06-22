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
