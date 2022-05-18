import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <main data-testid="page-search">
        <Header />
        <h1>Search</h1>
      </main>
    );
  }
}

export default Search;
