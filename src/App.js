import React from 'react';
import StarWarsProvider from './StarWarsProvider';
import Table from './Table';
import Filter from './Filter';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <Filter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
