import React, { Component } from 'react'
import Colors from '../constants/Colors';

const TicketFields = (props) => {
  return(
    <div style={{ ...styles.container, ...props.style }}>
      <h3 style={ styles.h3 }>{ props.title }</h3>
      <p style={ styles.content }>{ props.children }</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'left',
    width: '50%',
    boxSizing: 'border-box',
    padding: 20,
    display: 'inline-block',
  }, h3: {
    margin: 0,
    color: Colors.blue,
  }, content: {
    margin: 0,
    fontSize: 20,
    marginTop: 10,
    textTransform: 'uppercase',
    borderBottom: '2px solid ' + Colors.celest,
    paddingBottom: 5,
  }
};

export default TicketFields;