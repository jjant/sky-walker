import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlightList from './FlightList';
import SortBar from './SortBar'
import SearchBar from './SearchBar';
import SearchSpinner from './SearchSpinner';
import { fetchFlights } from '../actions/flightsActions';
import ReactPaginate from 'react-paginate';

class Search extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 3
    this.state = {currentFlights: this.props.flights.slice(0, this.pageSize), page: 0};
  }

  componentWillMount() {
    this.props.dispatch(fetchFlights(this.props.flightParams));
  }

  renderTitle() {
    const oneWay = <h1 style={styles.title}>Seleccione su vuelo</h1>;
    const roundTripForward = <h1 style={styles.title}>Seleccione su vuelo de ida</h1>;
    const roundTripBack = <h1 style={styles.title}>Seleccione su vuelo de vuelta</h1>;
    if (this.props.flightParams.round_trip) {
      return this.props.isFirstFlight ? roundTripForward : roundTripBack;
    }
    return oneWay;
  }

  renderFlightList(flights) {
    if (this.props.fetching || !this.props.flights)
      return <SearchSpinner />;
    return <FlightList flights={flights || this.props.flights} airlines={this.props.airlines} />;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentFlights: nextProps.flights.slice(this.state.page * this.pageSize, (this.state.page * this.pageSize) + this.pageSize), page: this.state.page }) 
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ currentFlights: this.props.flights.slice(selected * this.pageSize, selected * this.pageSize + this.pageSize), page: selected });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.topBar}>
          {this.renderTitle()}
          <SortBar />
        </div>
        <div style={styles.flights}>
          {/* <SearchBar /> */}
          {this.renderFlightList(this.state.currentFlights)}
          { this.props.fetching || !this.props.flights ? null : <ReactPaginate previousLabel={"Anterior"}
                       nextLabel={"Siguiente"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={Math.ceil(this.props.flights.length / this.pageSize)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"pagination-active"} /> }
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '55px auto 0',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  flights: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1300px',
    alignItems: 'center',
  },
  topBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '45px',
  },
  title: {
    margin: '0 0 0 200px',
  },
};

const mapStateToProps = (state) => ({
  fetching: state.flights.fetching,
  flightParams: state.flights.flightParams,
  flights: state.flights.flights,
  airlines: state.flights.airlines,
  isFirstFlight: state.flights.flightParams.first_flight,
});

export default connect(mapStateToProps)(Search);
