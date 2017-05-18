import React, { Component } from 'react';
import Colors from '../constants/Colors';
import TicketField from './TicketField'
import moment from 'moment';

export default class BoardingPass extends Component {
  render() {
    const adults = Number(this.props.flight.rawPrice.adults ? this.props.flight.rawPrice.adults.quantity : 0);
    const children = Number(this.props.flight.rawPrice.children ? this.props.flight.rawPrice.children.quantity : 0);
    const infants = Number(this.props.flight.rawPrice.infants ? this.props.flight.rawPrice.infants.quantity : 0);

    return (
      <div style={{ ...this.props.style, ...styles.ticketContainer}}>

        <div style={styles.tripContainer}>
          <div style={styles.ticketHeader}><span>{ this.props.flight.airline.name }</span> <span>VUELO #{this.props.flight.id}</span></div>
          <TicketField title="Desde">{ this.props.flight.departureCity.name } ({ this.props.flight.departureAirport.id.toUpperCase()})</TicketField>
          <TicketField title="Partida" style={{ width: 'auto' }}>{ moment(this.props.flight.departureTime).format('DD/MM/YYYY hh:mm')} ({this.props.flight.departureAirport.timeZone}) </TicketField>
          <TicketField title="Hasta">{ this.props.flight.arrivalCity.name } ({ this.props.flight.arrivalAirport.id.toUpperCase()})</TicketField>
          <TicketField title="Llegada" style={{ width: 'auto' }}>{ moment(this.props.flight.arrivalTime).format('DD/MM/YYYY hh:mm')} ({this.props.flight.arrivalAirport.timeZone})</TicketField>
        </div>

        <div style={styles.billContainer}>
          <div style={{...styles.ticketHeader, justifyContent: 'center'}}>TICKET</div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '80%', margin: '0 auto', height: 'calc(100% - 60px)', fontSize: 19, textAlign: 'left'}}>
            { adults ? <div style={styles.billItemContainer}><span>{ adults } { adults == 1 ? 'Adulto' : 'Adultos' }:</span><span>{adults} x U$D { this.props.flight.rawPrice.adults.base_fare }</span></div> : null }
            { children ? <div style={styles.billItemContainer}><span>{ children } { children == 1 ? 'Niño' : 'Niños' }:</span><span>{children} x U$D { this.props.flight.rawPrice.children.base_fare }</span></div> : null }
            { infants ? <div style={styles.billItemContainer}><span>{ infants } { infants == 1 ? 'Infante' : 'Infantes'}:</span><span>{infants} x U$D { this.props.flight.rawPrice.infants.base_fare }</span></div> : null }
            <div style={{...styles.billItemContainer, fontSize: 14, margin: '5px 0'}}><span>Impuestos y cargos:</span><span>U$D { this.props.flight.rawPrice.total.charges + this.props.flight.rawPrice.total.taxes }</span></div>
            <div style={{ width: '100%', borderTop: `3px solid ${Colors.celest}`, color: Colors.blue, margin: '0 auto', marginTop: 5, paddingTop: 10, textAlign: 'center', fontWeight: 900, fontSize: 22}}>TOTAL: U$D {this.props.flight.rawPrice.total.total }</div>
          </div>
        </div>

      </div>
    );
  }
}

const styles = {
  ticketContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: 900,
    background: Colors.gray,
    border: '1px solid grey',
  }, ticketHeader: {
    width: '100%',
    boxSizing: 'border-box',
    fontSize: 25,
    fontWeight: 900,
    color: Colors.blue,
    height: 60,
    background: Colors.celest,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
  }, tripContainer: {
    width: '70%',
    textAlign: 'left',
    boxSizing: 'border-box',
    display: 'inline-block',
  }, billContainer: {
    width: '30%',
    boxSizing: 'border-box',
    display: 'inline-block',
    borderLeft: '1px dashed grey',
  }, billItemContainer : {
    display: 'flex',
    justifyContent: 'space-between',
  }
};