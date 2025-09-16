import { useCampo } from '../../hooks/useCampo'
import PropTypes from 'prop-types'

const BlogForm = ({ crearBlog }) => {
  // Campos del formulario
  const titulo = useCampo('text')
  const autor = useCampo('text')
  const url = useCampo('text')

  // Instancia para limpiar los campos del formulario
  const limpiarFormulario = () => {
    titulo.limpiar()
    autor.limpiar()
    url.limpiar()
  }

  // Manejador de evento para añadir blogs
  const añadirBlog = e => {
    e.preventDefault() // Evita recarga de página
    crearBlog({
      titulo: titulo.value,
      autor: autor.value,
      url: url.value,
      likes: 0
    })
    limpiarFormulario()
  }

  return (
    <div className='formDiv'>
      <h2>Añadir Blog</h2>
      <form onSubmit={añadirBlog}>
                Título:
        <input {...titulo.inputProps} id='titulo-input'/>
        <br />
                Autor:
        <input {...autor.inputProps} id='autor-input'/>
        <br />
                Url:
        <input {...url.inputProps} id='url-input'/>
        <br />
        <button type='submit'>Añadir</button>
        <button type='button' onClick={limpiarFormulario}>Limpiar</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  crearBlog: PropTypes.func.isRequired
}

export default BlogForm