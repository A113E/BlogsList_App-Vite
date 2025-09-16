import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  // Estado que maneja la visibilidad del componente hijo
  const [ visibilidad, setVisibilidad ] = useState(false)

  // Estilos inLine
  const ocultarVisible = { display: visibilidad ? 'none' : '' }
  const mostrarVisible = { display: visibilidad ? '' : 'none' }

  // Función para manejar el cambio
  const toggleVisibilidad = () => {
    setVisibilidad(!visibilidad)
  }

  // Volver a cerrar el formulario al crear un blog
  useImperativeHandle(refs, () => {
    return {
      toggleVisibilidad
    }
  })

  return (
    <div>
      <div style={ocultarVisible}>
        <button onClick={toggleVisibilidad}> {props.buttonLabel} </button>
      </div>
      <div style={mostrarVisible} className='togglableContent'>
        { props.children }
        <button onClick={toggleVisibilidad}> Cancelar </button>
      </div>
    </div>
  )
})

// Arreglar el error: Component definition is missing display name
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable