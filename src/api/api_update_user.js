const BASE_URL = 'https://estagio.almt.app';

export async function getUser () {
  const res = await fetch(`${BASE_URL}/user`, {
    credentials: 'include',
  })
  if (!res.ok) throw await res.json()
  return res.json()
}

export async function updateUser ({ name, old_password, new_password }) {
  const res = await fetch(`${BASE_URL}/user/update`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      old_password,
      new_password,
    }),
  })
  if (!res.ok) throw { ...(await res.json()), status: res.status }

}
