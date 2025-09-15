import React from 'react'
import { useState, useEffect, useRef } from 'react'

// Importar los componentes
import BlogForm from './componentes/Blogs/BlogForm'
import BlogLista from './componentes/Blogs/BlogLista'
import BuscarBlog from './componentes/Blogs/BuscarBlog'
import Notificacion from './componentes/Rutas/Notificacion'
import LoginForm from './componentes/Login/LoginForm'
import Togglable from './componentes/Rutas/Togglable'

// Importar los servicios
import { obtenerBlogs, like, crear, eliminar} from './servicios/blogServicio'
import { login } from './servicios/login.js'
import { cargarUsuario, eliminarUsuario, usuarioGuardado } from './servicios/storage.js'

const App = () => {
  // Estados
  const [blogs, setBlogs] = useState([])
  const [buscarBlog, setBuscarBlog] = useState('')
  const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' })
  const [usuario, setUsuario] = useState(null)

  const blogFormRef = useRef() // Referencia al componente

  // Hook para cargar los blogs desde el servidor
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsObtenidos = await obtenerBlogs()
        setBlogs(blogsObtenidos) // Actualiza el estado con los blogs obtenidos
      } catch (error) {
        console.error('Error al intentar obtener los blogs', error)
      }
    }
    fetchBlogs() // Llama a la función asincrónica
  }, [])

  // Hook para comprobar que ls datos del usuario se guradan wn localStorage al recargar la página
  useEffect(() => {
    const usuario = cargarUsuario()
    if (usuario) {
      setUsuario(usuario)
    }
  }, [])

  // Función para manejar los like a un blog
  const manejadorLikesChange = async (id) => {
    try {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog)
      )

      const blogLike = await like(id)
      // Actualiza el estado con la respuesta del server
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => blog.id !== id ? blog : blogLike)
      )
      mostrarNotificacion('Like agregado exitosamente', 'exito')
    } catch (error) {
      console.error('Error al intentar dar like al blog', error)
      mostrarNotificacion('Error al agregar like', 'error')
    }
  }

  // Función para añadir un blog
  const añadirBlog = async (blogObjeto) => {
    try {
      blogFormRef.current.toggleVisibilidad()
      const blogCreado = await crear(blogObjeto)
      // Agrega el nuevo blog al array
      setBlogs((prevBlogs) => prevBlogs.concat(blogCreado))
      mostrarNotificacion(`Blog ${blogCreado.titulo} añadido exitosamente por ${usuario.nombre_usuario}`, 'exito')
    } catch (error) {
      console.error('Error al crear nuevo blog', error)
      mostrarNotificacion('Error al añadir blog', 'error')
    }
  }

  // Función para eliminar un blog
  const manejadorEliminarBlogs = async (id) => {
    try {
      const blogAeliminar = blogs.find(blog => blog.id === id) // Busca el blog a eliminar por el ID
      if (!blogAeliminar) {
        return
      }

      // Mensaje de confirmación para eliminar el blog
      if (window.confirm(`Esta seguro que desea eliminar el blog ${blogAeliminar.titulo}`)) {
        await eliminar(id)
        setBlogs(blogs.filter(blog => blog.id !== id)) // Comprueba que el blog se eliminó del estado
        mostrarNotificacion(`Blog ${blogAeliminar.titulo} eliminado por ${usuario.nombre_usuario}`, 'exito')
      }
    } catch (error) {
      console.error('Error al eliminar el blog', error)
      mostrarNotificacion('Error al eliminar el blog', 'error')
    }
  }

  // Manejador de eventos para buscar titulos de blogs
  const handleBusquedaChange = e => setBuscarBlog(e.target.value)

  // Función para buscar blogs por titulo
  const blogsFiltrados = buscarBlog
    ? blogs
      .filter(blog => blog.titulo.toLowerCase().includes(buscarBlog.toLowerCase()))
      .sort((a,b) => b.likes - a.likes) // Ordena el filtro por cantidad de likes
    : [...blogs].sort((a, b) => b.likes - a.likes) // Ordena igualmente si no hay búsqueda activa

  // Función para mostrar las notificaciones
  const mostrarNotificacion = (mensaje, tipo) => {
    setNotificacion({ mensaje, tipo })
    // Tiempo del mensaje en pantalla
    setTimeout(() => {
      setNotificacion({ mensaje: '', tipo: '' })
    }, 5000) // 5 segs
  }

  // Manejador de eventos para el login
  const handleLogin = async ({ nombre_usuario, password }) => {
    try {
      const usuario = await login({ nombre_usuario, password })
      setUsuario(usuario)
      usuarioGuardado(usuario)
      mostrarNotificacion(`Bienvenido ${nombre_usuario}`, 'exito')
    } catch (error) {
      console.error('Error al intentar iniciar sesión', error)
      mostrarNotificacion('No se pudo iniciar sesión. Credenciales incorrectas', 'error')
    }
  }

  // Manejador de evento para el logout
  const handleLogout = () => {
    setUsuario(null)
    eliminarUsuario()
    mostrarNotificacion(`${usuario.nombre} ha cerrado sesión`)
  }

  return (
    <div>
      <h1>BlogsList_App</h1>
      <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
      <BuscarBlog buscarBlog={buscarBlog} handleBusquedaChange={handleBusquedaChange} />
      {!usuario &&
        <Togglable buttonLabel='Iniciar Sesión'>
          <LoginForm
            usuarioLogged={handleLogin}
          />
        </Togglable>
      }
      {usuario &&
        <div>
          <p> {usuario.nombre} conectado</p> <button onClick={handleLogout}>Cerrar Sesión</button>
          <Togglable buttonLabel='Añadir blog' ref={blogFormRef}>
            <BlogForm crearBlog={añadirBlog} />
          </Togglable>
        </div>
      }
      <br />
      <BlogLista blogs={blogsFiltrados} manejadorLikesChange={manejadorLikesChange} onDelete={manejadorEliminarBlogs} />
      <br />
      <em className='footer'>Blog App. FullSack Course 2025</em>
    </div>
  )
}

export default App
