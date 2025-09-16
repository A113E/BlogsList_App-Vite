import { render, screen } from '@testing-library/react'
import Notificacion from './Notificacion'
import { expect } from 'vitest'

// Prueba que verifica que un mensaje es mostrado
test('se muestra un mensaje', () => {
  render(<Notificacion mensaje={'Probando los mensajes'} tipo={'exito'}/>)

  const notificacion = screen.getByText('Probando los mensajes')
  screen.debug(notificacion)

  // Comprueba que se muestre el mensaje
  expect(notificacion).toBeDefined()
})

// Prueba que verifica que no se muestra nada si no hay mensaje
test('no renderiza nada si no hay mensaje', () => {
  const { container } = render(<Notificacion mensaje={''} tipo={'error'} />)
  // Comprueba que no se renderiza nada
  expect(container).toBeEmptyDOMElement()
})

// Prueba que verifica que si el mensaje es exitoso es de color verde
test('el mensaje es de color verde si es exitoso', () => {
  render(<Notificacion mensaje={'Mensaje exitoso'} tipo={'exito'} />)
  const notificacion = screen.getByText('Mensaje exitoso')
  // Comprueba de que sea color verde
  expect(notificacion).toHaveClass('exito')
})

// Prueba que verifica si el mensaje es error es de color rojo
test('el mensaje es de color rojo si es error', () => {
  render(<Notificacion mensaje={'Error'} tipo={'error'} />)
  const notificacion = screen.getByText('Error')
  // Comprueba que sea de color rojo
  expect(notificacion).toHaveClass('error')
})