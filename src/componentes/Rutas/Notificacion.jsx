const Notificacion = ({ mensaje, tipo }) => {
  if (!mensaje) return null // Solo muestra la notificacion si hay mensaje
  // Estilo para las notificaciones
  const estiloNotificacion = {
    color: tipo === 'exito' ? 'green' : 'red',
    background: 'lightgrey',
    fontsize: '20px',
    border: `1px solid ${tipo === 'exito' ? 'green' : 'red'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return <div style={estiloNotificacion} className={`divMensaje ${tipo}`}> {mensaje} </div>
}

export default Notificacion