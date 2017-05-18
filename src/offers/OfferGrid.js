import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import api from '../lib/api';
import OfferItem from './OfferItem';

// Connect with search from.

class OfferGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { deals: [] };
  }

  componentWillMount() {
    this.getDeals();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.from !== nextProps.from) this.getDeals();
  }

  getDeals = async () => {
    const deals = await api.getDeals({ from: this.props.from || 'BUE' });
    this.setState({ deals });
  }

  render() {
    return(
      <Masonry style={{ width: 1200, margin: '0 auto'}}>
          {this.state.deals.length}
        { this.state.deals.sort((a,b) => a.price - b.price ).slice(-2).map((offer, id) => <OfferItem key={id} offer={offer} />) }
      </Masonry>
    );
  }
}

export default OfferGrid;