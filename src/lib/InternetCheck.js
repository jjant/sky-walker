import React, { Component } from 'react';
import Alert from 'react-s-alert';

export default class InternetCheck extends Component {
  componentWillMount() {
    const msj = 'Parece que no tiene conexión a internet. Compruebe su conexión y recuperela si quiere seguir con su compra.';
    setInterval(async () => {
      try {
        const res = await fetch('https://www.google.com.ar/?gws_rd=ssl', { mode: 'no-cors' });
      } catch (e) {
        Alert.error(msj);
      }
    }, 1000 * 30)
  }

  render() {
    return null
  }
}