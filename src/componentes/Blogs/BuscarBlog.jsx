import React from 'react'

const BuscarBlog = ({ buscarBlog, handleBusquedaChange }) => (
  <div>
    <strong>Buscar título del blog:</strong> <input value={buscarBlog} onChange={handleBusquedaChange} placeholder='Titulo del blog'/>
  </div>
)

export default BuscarBlog