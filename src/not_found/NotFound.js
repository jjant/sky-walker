import React from 'react';
import Colors from '../constants/Colors';

const NotFound = () => (
  <div>
    <h1 style={{ color: Colors.pink, margin: 0, marginTop: 60, position: 'relative', fontSize: 50 }}>No hay nada que ver aquí</h1>
    <h3>Probá de escribir otra dirección URL, o volver a la <a href="/">Página principal</a></h3>
  </div>
);

export default NotFound;
