import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BuscarBlog from './BuscarBlog.jsx'

// Prueba que verifica que se renderiza el input con el valor incial
test('renderiza el input con el valor inicial', () => {
  const mockHandler = jest.fn() // Controlador de eventos
  render(<BuscarBlog buscarBlog={'React'} handleBusquedaChange={mockHandler} />)

  const input = screen.getByPlaceholderText('Titulo del blog')
  expect(input.value).toBe('React') // Comprueba que se renderiza el valor
})

// Prueba que verifica que se llame al controlador de eventos cuando el usuario escribe en el input
test('llama al controlador de eventos cuando el usuario escribe en el input', async () => {
  const mockHandler = jest.fn() // Controlador de eventos
  const usuario = userEvent.setup() // Usuario
  render(<BuscarBlog buscarBlog={''} handleBusquedaChange={mockHandler} />)

  const input = screen.getByPlaceholderText('Titulo del blog')

  await usuario.type(input, 'Probando buscador...')

  expect(mockHandler).toHaveBeenCalled() // Comprueba que se llama al controlador
})