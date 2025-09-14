import axios from 'axios'
import { cargarUsuario } from './storage'
const baseUrl = `${BACKEND_URL}/blogs`

// Autentificacion
const obtenerConfit = () => ({
  headers: { Authorization: `Bearer ${cargarUsuario().token}` }
})

// Servicio para obtener los blogs
export const obtenerBlogs = () => {
  return axios.get(baseUrl).then(res => res.data)
}

// Servicio para dar like a un blog
export const like = id => {
  return axios.post(`${baseUrl}/${id}/likes`).then(res => res.data)
}

// Servicio para crear un nuevo blog
export const crear = nuevoBlog => {
  return axios.post(baseUrl, nuevoBlog, obtenerConfit()).then(res => res.data)
}

// Servicio para elminar un blog
export const eliminar = id => {
  return axios.delete(`${baseUrl}/${id}`, obtenerConfit()).then(res => res.data)
}