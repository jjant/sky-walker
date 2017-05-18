import React from 'react';
import api from '../lib/api';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OfferItem = ({ offer }) => {
  const fullname = `${offer.city.name} ${offer.country.id === 'AR' ? ', Argentina' : ""}`;
  return (
    <div style={{...styles.container, height: getRandomInt(200, 300), width: 280}}>
      { api.getCitiesImages(fullname) && 'pl'}
      <h1>{ offer.city.name }{ offer.country.id === 'AR' ? ', Argentina' : "" }</h1>
      <h2> A solo U$D{offer.price}</h2>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'red',
    margin: 10,
    cursor: 'pointer',
  }
}

export default OfferItem;