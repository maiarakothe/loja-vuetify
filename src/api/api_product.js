const BASE_URL = 'https://estagio.almt.app';

export const createProduct = async (name, category_type, quantity, value, url, accountId) => {
  const response = await fetch(`${BASE_URL}/product?account_id=${accountId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      name,
      category_type: category_type || null,
      quantity: quantity || null,
      value,
      url,
    }),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const getAllProducts = async (accountId) => {
  const response = await fetch(`${BASE_URL}/products?account_id=${accountId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const getProduct = async (productId, accountId) => {
  const response = await fetch(`${BASE_URL}/product/${productId}?account_id=${accountId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const deleteProduct = async (productId, accountId) => {
  const response = await fetch(`${BASE_URL}/product/${productId}?account_id=${accountId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (response.ok) {
    return response.text();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};

export const updateProduct = async (productId, name, category_type, quantity, value, url, accountId) => {
  const response = await fetch(`${BASE_URL}/product/update?product_id=${productId}&account_id=${accountId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      name,
      category_type: category_type || null,
      quantity: quantity || null,
      value,
      url,
    }),
  });

  if (response.ok) {
    return response.text();
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
};
