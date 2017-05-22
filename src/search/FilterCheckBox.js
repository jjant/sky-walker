import React, { Component } from 'react';
import Colors from '../constants/Colors';

const getOpacity = (checked) => ({ opacity: (checked ? 1 : 0.1) });

const FilterCheckBox = ({ checked }) => (
  <div style={styles.container}>
    <input
      type="checkbox"
      checked={checked}
      readOnly
    />
    <label style={styles.label} />
    <div style={{...styles.after, ...getOpacity(checked)}} />
  </div>
);

const styles = {
  container: {
    width: '18px',
    height: '18px',
    marginRight: '5px',
    display: 'inline-block',
    position: 'relative',
  },
  label: {
    cursor: 'pointer',
    position: 'absolute',
    width: '16px',
    height: '16px',
    top: '0',
    left: '0',
    background: Colors.white,
    border: '1px solid #ddd',
  },
  after: {
    content: "''",
    position: 'absolute',
    width: '7px',
    height: '4px',
    background: 'transparent',
    top: '5px',
    left: '5px',
    border: '2px solid #333',
    borderTop: 'none',
    borderRight: 'none',
    transform: 'rotate(-45deg)',
    pointerEvents: 'none',
  }
};

export default FilterCheckBox;
