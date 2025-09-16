import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.jsx'
import { expect } from 'vitest'

// Prueba para renderizar el titulo de un blog
test('renderizar el titulo blog', () => {
  const blog = {
    titulo: 'Titulo a renderizar',
    autor: 'Admin',
    url: 'https://blog',
    likes: 0
  }

  render(<Blog blog={blog} />)

  screen.debug() // Mostrar en la consola

  // Comprueba que el blog puede ser renderizado
  const titulo = screen.getByText('Titulo a renderizar')
  screen.debug(titulo)
  expect(titulo).toBeDefined()
})

// Prueba que verifica que el titulo de un blog puede ser visto
test('renderizar titulo y autor por defecto, y no la url y los likes', () => {
  const blog = {
    titulo: 'Titulo de prueba',
    autor: 'Admin',
    url: 'https://blog',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />) // Renderizar el compononte

  screen.debug() // Mostrar el html en la consola

  const encabezado = container.querySelector('.blog-encabezado')
  expect(encabezado).toBeDefined()

  // Verifica que la url, el creador y los likes no se muestren por defecto
  const detalles = container.querySelector('.blog-detalles')
  expect(detalles).toBeNull()
})

// Prueba que verifica que la url, el creador y los likes se muestren al dar click en boton mostrar detalles
test('la url y los likes se renderizan con el boton Mostrar Detalles', async () => {
  const blog = {
    titulo: 'Otro blog de prueba',
    autor: 'Admin',
    url: 'https://blog',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />) // Renderizar el compononte

  const usuario = userEvent.setup() // Se inicia sesion con usuario para interactuar

  // Verificamos que la url y los likes no están por defecto
  const detallesOcultos = container.querySelector('.blog-detalles')
  expect(detallesOcultos).toBeNull()

  // Simula el click en el boton
  const boton = screen.getByText('Mostrar Detalles')
  screen.debug(boton)
  await usuario.click(boton)

  screen.debug() // Mostrar el html en la consola

  // Comprueba que la url, el creador y los likes se mustren
  const detallesMostrados = container.querySelector('.blog-detalles')
  expect(detallesMostrados).toBeDefined()
})

// Prueba que verifica que si hace click dos veces en el boton de likes, se llama dos veces al controlador de eventos
test('si se hace click dos veces en el boton like, se llama dos veces al controlador de eventos', async () => {
  const blog = {
    titulo: 'Probando controlador de eventos dos veces',
    autor: 'Admin',
    url: 'www.miblog',
    likes: 0
  }

  // Controlador de eventos
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} manejadorLikesChange={mockHandler}/>) // Renderizar el compononte

  // Inicia sesión con un usuario
  const usuario = userEvent.setup()

  // Simula click en el boton mostrar detalles
  const mostrasDetallesBtn = screen.getByText('Mostrar Detalles')
  screen.debug(mostrasDetallesBtn)
  await usuario.click(mostrasDetallesBtn)

  screen.debug() // Mostrar el html en la consola

  // Comprueba que se muestren los detalles
  const detallesMostrados = container.querySelector('.blog-detalles')
  expect(detallesMostrados).toBeDefined()

  // Busca el boton like
  const likeBtn = screen.getByText('Like')
  screen.debug(likeBtn)
  await usuario.dblClick(likeBtn)

  // Comprobamos que el controlador de eventos fue llamado dos veces
  expect(mockHandler).toHaveBeenCalledTimes(2)
})
