import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

// Prueba que verifica que se llame al controlador de eventos al inciar sesión con las credenciales correctas
test('se llama al controlador de eventos cuando se inicia sesión con las credenciales correctas', async () => {
  const usuarioLogged = vi.fn()
  const usuario = userEvent.setup()

  const { container } = render(<LoginForm usuarioLogged={usuarioLogged} />)

  // Selecciona los campos
  const nombreInput = container.querySelector('#nombre-input')
  const passwordInput = container.querySelector('#password-input')
  const loginBtn = screen.getByText('Entrar')

  screen.debug(loginBtn)

  // Simula interacción
  await usuario.type(nombreInput, 'Admin...')
  await usuario.type(passwordInput, 'Sekret...')
  await usuario.click(loginBtn)

  screen.debug()

  // Verificaciones
  expect(usuarioLogged).toHaveBeenCalledTimes(1)
  expect(usuarioLogged).toHaveBeenCalledWith({
    nombre_usuario: 'Admin...',
    password: 'Sekret...'
  })
})
