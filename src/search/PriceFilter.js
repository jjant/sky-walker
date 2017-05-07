import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Colors from '../constants/Colors';

const PriceFilter = () => (
  <div style={styles.container}>
    <h2 style={styles.header}>Precio</h2>
    <Range
      min={0}
      max={2000}
      defaultValue={[10, 1000]}
      step={40}
      marks={{1: 'asda'}}
      style={{}}
      pushable
    />
  </div>
);

const border = `1px solid ${Colors.gray}`;
const styles = {
  container: {
    textAlign: 'left',
    marginBottom: '30px',
  },
  header: {
    color: Colors.blue,
    borderTop: border,
    borderBottom: border,
    fontSize: '20px',
    padding: '3px 20px',
    margin: '0',
  },
  option: {
    padding: '0 20px',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
  },
};

export default PriceFilter;
