import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, manejadorLikesChange, onDelete, usuario }) => {
  const [mostrar, setMostrar] = useState(false)

  // Determinar el usuario que creó el blog
  const creadorBlog = blog.usuario ? blog.usuario.nombre : 'Anónimo'

  // Blog puede ser eliminado por el usuario que lo creó
  const puedeEliminar = blog.usuario && usuario && blog.usuario._id === usuario._id

  return (
    <div className='blog'>
      <div className='btn-detalles'>
        <button onClick={() => setMostrar(!mostrar)}>
          { mostrar ? 'Ocultar Detalles' : 'Mostrar Detalles' }
        </button>
      </div>
      <div>
        <h3>{blog.titulo}</h3> <br />
        <strong>Autor:</strong> {blog.autor}
      </div>
      {mostrar && (
        <div>
          <div className='enlace-blog'>
            <a href={blog.url}>Visitar Blog</a>
          </div>
          <div>{creadorBlog}</div>
          <div>
            <strong>Likes:</strong> {blog.likes}{' '}
            <button onClick={() => manejadorLikesChange(blog.id)}>Like</button>
          </div>
          {puedeEliminar && (
            <button onClick={() => onDelete(blog.id)}>Eliminar</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    autor: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    usuario: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      nombre_usuario: PropTypes.string.isRequired,
      nombre: PropTypes.string
    })
  }).isRequired,
  manejadorLikesChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  usuario: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre_usuario: PropTypes.string,
    nombre: PropTypes.string
  })
}

export default Blog
