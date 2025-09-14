import React from 'react';
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