export const loginUser = async (email, password) => {
  const response = await fetch('https://estagio.almt.app/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(errorText);
    error.status = response.status;
    throw error;
  }

  const user = await response.json();

  // Após login, buscar a conta para pegar account_id
  const accountsResponse = await fetch('https://estagio.almt.app/accounts', {
    method: 'GET',
    credentials: 'include',
  });

  if (!accountsResponse.ok) {
    const errorText = await accountsResponse.text();
    throw new Error('Erro ao buscar contas: ' + errorText);
  }

  const accounts = await accountsResponse.json();

  if (accounts.length === 0) {
    throw new Error('Nenhuma conta encontrada para o usuário.');
  }

  const selectedAccount = accounts[0];

  return {
    user,
    accountId: selectedAccount.id,
  };
};

export const logoutUser = async () => {
  const response = await fetch('https://estagio.almt.app/logout', {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Erro ao fazer logout.')
  }

  localStorage.removeItem('user')
  localStorage.removeItem('accountId')
}
