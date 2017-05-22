import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import api from '../lib/api';
import OfferItem from './OfferItem';
import LON from '../../assets/LON.jpg';
import NQN from '../../assets/NQN.jpg';
import NYC from '../../assets/NYC.jpg';
import RGL from '../../assets/RGL.jpg';
import IGR from '../../assets/IGR.jpg';
// import SLA from '../../assets/SLA.jpg';
// import PSS from '../../assets/PSS.jpg';
import MVD from '../../assets/MVD.jpg';
// import MEX from '../../assets/MEX.jpg';
// import BCN from '../../assets/BCN.jpg';
// import SAO from '../../assets/SAO.jpg';
// import PAR from '../../assets/PAR.jpg';
import FLN from '../../assets/FLN.jpg';
// import BOG from '../../assets/BOG.jpg';
// import CUN from '../../assets/CUN.jpg';
// import BHI from '../../assets/BHI.jpg';
// import LAX from '../../assets/LAX.jpg';
import SCL from '../../assets/SCL.jpg';
// import LIM from '../../assets/LIM.jpg';
import ASU from '../../assets/ASU.jpg';
// import MIA from '../../assets/MIA.jpg';
// import FTE from '../../assets/FTE.jpg';
// import CRD from '../../assets/CRD.jpg';
import RIO from '../../assets/RIO.jpg';
// import COR from '../../assets/COR.jpg';
// import REL from '../../assets/REL.jpg';
// import MDZ from '../../assets/MDZ.jpg';
// import UAQ from '../../assets/UAQ.jpg';
// import BRC from '../../assets/BRC.jpg';
// import USH from '../../asset/USH.jpgs';
//
const images = {
  LON,
  NQN,
  NYC,
  RGL,
  IGR,
//   SLA,
//   PSS,
  MVD,
//   MEX,
//   BCN,
//   SAO,
//   PAR,
  FLN,
//   BOG,
//   CUN,
//   BHI,
//   LAX,
  SCL,
//   LIM,
  ASU,
//   MIA,
//   FTE,
//   CRD,
  RIO,
//   COR,
//   REL,
//   MDZ,
//   UAQ,
//   BRC,
//   USH,
}
// Connect with search from

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
    const nombresQueQuiero = ["LON", 'MVD', 'RIO', 'SCL', 'FLN', 'ASU', 'RGL', 'IGR'];
    return(
      <Masonry style={{ width: 1200, margin: '0 auto'}}>
        { this.state.deals.sort((a,b) => a.price - b.price ).filter(deal => nombresQueQuiero.includes(deal.city.id)).map((offer, id) => <OfferItem key={id} offer={offer} image={images[offer.city.id]} />) }
      </Masonry>
    );
  }
}

export default OfferGrid;
