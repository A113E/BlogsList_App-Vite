import axios from 'axios'
import { cargarUsuario } from './storage'
import { BACKEND_URL } from '../config'

const baseUrl = `${BACKEND_URL}/blogs`

// Autentificacion
const obtenerConfit = () => {
  const usuario = cargarUsuario()
  if (!usuario?.token) {
    throw new Error('Usuario no autenticado') // evita hacer PUT sin token
  }
  return {
    headers: { Authorization: `Bearer ${usuario.token}` }
  }
}

// Servicio para obtener los blogs
export const obtenerBlogs = () => {
  return axios.get(baseUrl).then(res => res.data)
}

// Servicio para dar like a un blog
export const like = id => {
  return axios.post(`${baseUrl}/${id}/likes`).then(res => res.data)
}

// Servicio para crear un nuevo blog
export const crear = blogObjeto => {
  return axios.post(baseUrl, blogObjeto, obtenerConfit()).then(res => res.data)
}

// Servicio para elminar un blog
export const eliminar = id => {
  return axios.delete(`${baseUrl}/${id}`, obtenerConfit()).then(res => res.data)
}

// Servicio para actualizar un blog
export const actualizar = (id, blogActualizado) => {
  return axios.put(`${baseUrl}/${id}`, blogActualizado, obtenerConfit()).then(res => res.data)
}