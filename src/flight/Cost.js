import React from 'react';
import Colors from '../constants/Colors';

const Cost = ({ price }) => (
  <div>
    <p style={{ ...styles.text, ...styles.description}}>
      Precio total final
    </p>
    <h2 style={{ ...styles.text, ...styles.priceDescription}}>
      USD <span style={styles.price}>{price.total}</span>
    </h2>
    <p style={styles.priceDetail}>{price.fare} (vuelo) + {price.charges} (cargos) + {price.taxes} (impuestos)</p>
  </div>
);

const width = '175px';
const height = '155px';
const styles = {
  text: {
    color: Colors.white,
    margin: '0',
  },
  priceDescription: {
    fontWeight: '400',
    fontSize: '22px',
  },
  price: {
    fontSize: '30px',
  },
  priceDetail: {
    fontSize: '10px',
    color: Colors.white,
  },
  description: {
    fontSize: '13px',
    marginBottom: '10px',
  },
};

export default Cost;
