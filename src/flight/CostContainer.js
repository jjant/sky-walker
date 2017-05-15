import React from 'react';
import Colors from '../constants/Colors';
import Cost from './Cost';
import Buy from './Buy';

const CostContainer = ({ price }) => (
  <div style={styles.container}>
    <Cost price={price} />
    <Buy />
  </div>
);

const width = '175px';
const height = '155px';
const styles = {
  container: {
    width,
    height,
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
};

export default CostContainer;
