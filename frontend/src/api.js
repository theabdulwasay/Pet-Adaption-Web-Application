const BASE_URL = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API error ${res.status}: ${body}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  listPets: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/pets/${qs ? `?${qs}` : ''}`)
  },
  getPet: (id) => request(`/pets/${id}/`),
  createPet: (data) => request(`/pets/`, { method: 'POST', body: JSON.stringify(data) }),
  updatePet: (id, data) => request(`/pets/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  deletePet: (id) => request(`/pets/${id}/`, { method: 'DELETE' }),
  stats: () => request(`/pets/stats/`),
  submitAdoption: (petId, data) => request(`/pets/${petId}/adopt/`, { method: 'POST', body: JSON.stringify(data) }),
}
