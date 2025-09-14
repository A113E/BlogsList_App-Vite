import axios from 'axios'
const baseUrl = `http://localhost:3003/api/login`

// Servicio para iniciar sesión con las credenciales correctas
export const login = (credenciales) => {
  return axios.post(baseUrl, credenciales).then(res => res.data)
}