import React from 'react';
import Colors from '../constants/Colors';

const PinkButton = (props) => {
  return <button {...props} style={{...styles.btn, ...props.style}}>{ props.children }</button>
}

export default PinkButton;

const styles = {
  btn: {
    backgroundColor: Colors.pink,
    border: '1px solid red',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 900
  }
}