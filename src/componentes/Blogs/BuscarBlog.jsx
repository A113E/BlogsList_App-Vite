import React from 'react'

const BuscarBlog = ({ buscarBlog, handleBusquedaChange }) => (
  <div>
    <strong>Buscar título del blog:</strong> <input value={buscarBlog} onChange={handleBusquedaChange} />
  </div>
)

export default BuscarBlog