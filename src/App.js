import React from 'react';
import StarWarsProvider from './StarWarsProvider';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <span>Hello, App!</span>
    </StarWarsProvider>
  );
}

export default App;
