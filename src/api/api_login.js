export const loginUser = async (email, password) => {
  const response = await fetch('https://estagio.almt.app/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorText = await response.text();
    const error = new Error(errorText);
    error.status = response.status;
    throw error;
  }
};
