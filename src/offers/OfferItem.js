import React from 'react';
import api from '../lib/api';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class OfferItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageHeight: 0};
  }

  _onLoad = (e) => {
    console.log(e.target)
    this.setState({ imageHeight: e.target.offsetHeight });
  }

  render() {
    const offer = this.props.offer;
    const image = this.props.image;
    const fullname = `${offer.city.name} ${offer.country.id === 'AR' ? ', Argentina' : ""}`;

    return (
      <div onMouseEnter={this._onMouseOver} onMouseLeave={this._onMouseOut} style={{...styles.container, height: this.state.imageHeight, width: 280 }}>
        <img className='offer-item' src={image} onLoad={this._onLoad} style={styles.image}/>
        <div style={styles.overlay}></div>
        <h1 style={styles.text}>{ offer.city.name }{ offer.country.id === 'AR' ? ', Argentina' : "" }</h1>
        <h2 style={styles.price}> A solo U$D{offer.price}</h2>
      </div>
    );
  }
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
    fontSize: 15,
  },
  image: {
    width: '100%',
    position: 'absolute',
    left: '0',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,.5)',
  },
  price: {
    fontWeight: 400,
    position: 'absolute',
    bottom: -10,
    right: 10,
    color: 'white',
    fontSize: 18,
  }
};
