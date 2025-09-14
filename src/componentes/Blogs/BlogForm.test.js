import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm.jsx';
import userEvent from '@testing-library/user-event';

// Prueba que verifica que el formulario llame al controlador de eventos cuando se crea un blog
test('el formulario llama al controlador de eventos cuando se crea un blog con los detalles correctos', async () => {
    const crearBlog = jest.fn() // Controlador de eventos
    const usuario = userEvent.setup() // Usuario
    const { container } = render(<BlogForm crearBlog={crearBlog} />) // Renderizar el componente

    // Seleccionar los campos de entrada (inputs) por los ids
    const inputTitulo = container.querySelector('#titulo-input')
    const inputAutor = container.querySelector('#autor-input')
    const inputUrl = container.querySelector('#url-input')

    const añadirBtn = screen.getByText('Añadir')

    screen.debug() // Mostrar el html en la consola

    // Simula la escritura de texto
    await usuario.type(inputTitulo, 'Probando el formulario...')
    await usuario.type(inputAutor, 'Test...')
    await usuario.type(inputUrl, 'www.test...')

    await usuario.click(añadirBtn)

    // Comprobamos que el controlador fue llamado una vez
    expect(crearBlog.mock.calls).toHaveLength(1)
    // Comprueba que cada linea sea correcta
    expect(crearBlog.mock.calls[0][0].titulo).toBe('Probando el formulario...')
    expect(crearBlog.mock.calls[0][0].autor).toBe('Test...')
    expect(crearBlog.mock.calls[0][0].url).toBe('www.test...')
})

// Prueba que verifica que el formulario llame al controlador de eventos al limpiar los campos (inputs)
test('el formulario llama al controlador de eventos cuando se limpian los campos', async () => {
  const limpiarFormulario = jest.fn() // lo pasamos por si el componente lo espera
  const user = userEvent.setup()
  const { container } = render(<BlogForm limpiarFormulario={limpiarFormulario} />)

  // Seleccionar los campos de entrada (inputs) por los ids
  const inputTitulo = container.querySelector('#titulo-input')
  const inputAutor = container.querySelector('#autor-input')
  const inputUrl = container.querySelector('#url-input')

  const limpiarBtn = screen.getByText('Limpiar')

  screen.debug() // Mostrar el html en la consola

  await user.type(inputTitulo, 'Probando limpiar el formulario...')
  await user.type(inputAutor, 'Test...')
  await user.type(inputUrl, 'www.test...')

  await user.click(limpiarBtn)

  // Verificamos que los inputs quedaron vacíos
  expect(inputTitulo).toHaveValue('')
  expect(inputAutor).toHaveValue('')
  expect(inputUrl).toHaveValue('')
})