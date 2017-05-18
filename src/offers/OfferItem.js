import React from 'react';
import api from '../lib/api';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OfferItem = ({ offer, image }) => {
  const fullname = `${offer.city.name} ${offer.country.id === 'AR' ? ', Argentina' : ""}`;
  return (
    <div style={{...styles.container, height: getRandomInt(225, 275), width: 280 }}>
      <img src={image} style={styles.image}/>
      <h1 style={styles.text}>{ offer.city.name }{ offer.country.id === 'AR' ? ', Argentina' : "" }</h1>
      <h2 style={styles.text}> A solo U$D{offer.price}</h2>
    </div>
  );
}

const styles = {
  container: {
    margin: 10,
    cursor: 'pointer',
    position: 'relative',
  },
  text: {
    position: 'relative',
    color: 'white',
  },
  image: {
    width: '100%',
    position: 'absolute',
    left: '0',
  },
};

export default OfferItem;
