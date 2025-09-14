import React from 'react'
import { useCampo } from '../../hooks/useCampo'
import PropTypes from 'prop-types'

const LoginForm = ({ usuarioLogged }) => {
  // Campos del formulario
  const nombre_usuario = useCampo('text')
  const password = useCampo('password')

  // Limpiar formulario
  const limpiarFormulario = () => {
    nombre_usuario.limpiar()
    password.limpiar()
  }

  // Manejador de eventos para login
  const loginUsuario = async (e) => {
    e.preventDefault()
    await usuarioLogged({
      nombre_usuario: nombre_usuario.value,
      password: password.value
    })
    limpiarFormulario()
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={loginUsuario}>
        <div>
                Nombre de usuario:
          <input {...nombre_usuario.inputProps} />
        </div>
        <div>
                Contraseña:
          <input {...password.inputProps} />
        </div>
        <button type='submit'>Iniciar Sesión</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  usuarioLogged: PropTypes.func.isRequired
}

export default LoginForm