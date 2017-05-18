import React, { Component } from 'react';
import HeaderResume from './HeaderResume'
import BillingLoader from './BillingLoader'

export default class BillingLoaderView extends Component {
  render() {
    return (
      <div style={styles.container}>
        <HeaderResume show={true} />
        <BillingLoader prevStep={ () => this.props.history.push('/passengers') } nextStep={ () => this.props.history.push('/summary') } />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    maxWidth: '1400px',
    margin: '55px auto 0',
    alignItems: 'center',
    marginBottom: 20,
  },
};