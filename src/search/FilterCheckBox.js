import React, { Component } from 'react';
import Colors from '../constants/Colors';

class FilterCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
  }

  handleChange() {
    this.setState(state => ({ checked: !state.checked }));
  }

  getOpacity() {
    return { opacity: this.state.checked ? 1 : 0 };
  }
  render() {
    return (
      <div style={styles.container}>
        <input
          type="checkbox"
          checked={this.state.checked}
          readOnly
        />
        <label
          style={styles.label}
          onClick={() => this.handleChange()}
        />
        <div style={{...styles.after, ...this.getOpacity()}} />
      </div>
    );
  }
}

const styles = {
  container: {
    width: '18px',
    height: '18px',
    marginRight: '5px',
    display: 'inline-block',
    position: 'relative',
  },
  label: {
    cursor: 'pointer',
    position: 'absolute',
    width: '16px',
    height: '16px',
    top: '0',
    left: '0',
    background: Colors.white,
    border: '1px solid #ddd',
  },
  after: {
    opacity: '0.2',
    content: "''",
    position: 'absolute',
    width: '7px',
    height: '4px',
    background: 'transparent',
    top: '5px',
    left: '5px',
    border: '2px solid #333',
    borderTop: 'none',
    borderRight: 'none',
    transform: 'rotate(-45deg)',
    pointerEvents: 'none',
  }
};

export default FilterCheckBox;
