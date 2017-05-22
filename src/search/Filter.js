import React from 'react';
import Colors from '../constants/Colors';
import FilterCheckBox from './FilterCheckBox';

const renderOptions = (options) => (
  options.map(option => (
    <div style={styles.option} key={option}>
      <FilterCheckBox />
      <label>{option}</label>
    </div>
  ))
);

const Filter = ({ headerName, options }) => (
  <div style={styles.container}>
    <h2 style={styles.header}>{headerName}</h2>
    {renderOptions(options)}
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

export default Filter;
