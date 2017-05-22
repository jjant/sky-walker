import React from 'react';
import Filter from './Filter';
import PriceFilter from './PriceFilter';
import Colors from '../constants/Colors';

const filters = [
  { headerName: 'Escalas', options: ['Directo', '1 escala', '2 o más escalas'] },
  { headerName: 'Aerolineas', options: ['Aerolineas Argentinas', 'Avianca', 'LATAM'] },
  // { headerName: 'Precio', options: ['$ 1000 - $ 1.500', '$ 1.500 - $ 2.000'] },
];

const SearchBar = () => (
  <div style={styles.container}>
    {filters.map(filter => <Filter {...filter} key={filter.headerName} />)}
    <PriceFilter />
  </div>
);

const styles = {
  container: {
    border: '2px solid',
    borderColor: Colors.gray,
    borderTop: '0',
    width: '300px',
    marginRight: '100px',
  },
};

export default SearchBar;
