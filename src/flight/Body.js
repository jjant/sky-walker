import React from 'react';

const Body = ({ airlineImage, departTime, arriveTime, flightMode }) => (
  <div style={styles.container}>
    <img
      src="https://puu.sh/vHyUJ/4c8d6d340b.png"
      style={styles.image}
    />
    <div style={styles.flightInformation}>
      <p>16:05</p>
      <p>Directo</p>
      <p>16:05</p>
    </div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '225px',
  },
  flightInformation: {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export default Body;
