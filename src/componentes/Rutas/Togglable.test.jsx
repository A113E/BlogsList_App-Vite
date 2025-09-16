import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable.jsx'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    ({ container } = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">
          Togglable Contenido
        </div>
      </Togglable>
    ))
  })

  // Prueba que verifica que se renderizen los componentes hijos
  test('los props children son renderizados', async () => {
    await screen.findAllByText('Togglable Contenido')
  })

  // Prueba que verifica que los componentes hijos no se muestren la inicio
  test('los props children no se muestran al inicio', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  // Prueba que verifica que se muestren los componentes hijos luego de dar click
  test('los props children se muestran al dar click en el boton', async () => {
    const usuario = userEvent.setup()
    const boton = screen.getByText('show...')
    screen.debug(boton)
    await usuario.click(boton)

    screen.debug()

    // Comprueba que se muestre los props children
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  // Prueba que verifica que se oculten los componentes hijos la dar click en el boton cancelar
  test('los props children se ocultan al dar click en el boton cancelar', async () => {
    const usuario = userEvent.setup()
    const boton = screen.getByText('show...')
    screen.debug(boton)
    await usuario.click(boton)

    const cerrarBtn = screen.getByText('Cancelar')
    screen.debug(cerrarBtn)
    await usuario.click(cerrarBtn)

    screen.debug()

    // Comprueba que oculte los props children
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})