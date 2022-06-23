import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StartWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const promise = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const { results } = await promise.json();
        setData(results);
        setFilteredPlanets(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  const contextValue = {
    data,
    setData,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
