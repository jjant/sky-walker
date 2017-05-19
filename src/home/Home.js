import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import OfferGrid from '../offers/OfferGrid';
import backgroundImage from '../../assets/barcelona.jpg';
import Colors from '../constants/Colors';

const Home = () => (
  <div>
    <div style={styles.container}>
      <img
        src={backgroundImage}
        style={styles.backgroundImage}
        alt="Ciudad de España"
        className="main-background-image"
      />
      <div style={styles.barWrapper}>
        <h1 style={styles.title} >Comenzá a viajar con Skywalker</h1>
        <SearchBar />
      </div>
    </div>

    <div style={styles.offerContainer}>
      <h2 style={{ color: Colors.darkGray, fontWeight: 200 }}>Descubre los destinos de tu próximo viaje</h2>
      <OfferGrid />
    </div>
    <div style={styles.deals} />

    <span style={{ color: Colors.darkGray }}> Skywalker &copy; 2017</span>
  </div>
);

const styles = {
  container: {
    position: 'relative',
  },
  title: {
    marginBottom: 60,
    fontSize: 40,
    color: Colors.pink
  },
  backgroundImage: {
    width: '100%',
    position: 'absolute',
    zIndex: '-1',
    top: '-100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  barWrapper: {
    marginTop: '100px',
  },
  deals: {
    width: '100%',
  },
  offerContainer: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: 20,
  }
};

export default Home;
