import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import StarWarsContext from './StartWarsContext';

function Filter() {
  const {
    data,
    setFilteredPlanets,
  } = useContext(StarWarsContext);

  const [searchPlanet, setSearchPlanet] = useState('');
  const [columnFilter, setColumnFilter] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filterSelect, setfilterSelect] = useState('population');
  const [operatorSelect, setOperatorSelect] = useState('maior que');
  const [numericInput, setNumericInput] = useState(0);
  const [numericFilters, setNumericFilters] = useState([]);

  const optionFilter = () => columnFilter.map((filters) => (
    <option key={ uuid() }>{filters}</option>
  ));

  const handlePlanetFilter = ({ target }) => {
    setSearchPlanet(target.value.toLowerCase());
  };

  useEffect(() => {
    const filteredNames = data
      .filter((planets) => planets.name.toLowerCase().includes(searchPlanet));

    const resultFiltered = numericFilters
      .reduce((accumulator, filter) => accumulator.filter((planets) => {
        console.log(Number(planets[filter.filterSelect]));
        console.log(Number(filter.numericInput));
        console.log(typeof Number(planets[filter.filterSelect]));
        console.log(typeof Number(filter.numericInput));
        switch (filter.operatorSelect) {
        case 'maior que':
          return Number(planets[filter.filterSelect]) > Number(filter.numericInput);
        case 'menor que':
          return Number(planets[filter.filterSelect]) < Number(filter.numericInput);
        case 'igual a':
          return Number(planets[filter.filterSelect]) === Number(filter.numericInput);
        default:
          return true;
        }
      }), filteredNames);

    setFilteredPlanets(resultFiltered);
  }, [data, searchPlanet, numericFilters, setFilteredPlanets]);

  const handleNumericFilter = () => {
    const numericFilter = {
      filterSelect,
      operatorSelect,
      numericInput,
    };
    console.log(columnFilter);
    console.log(filterSelect);
    const newColumnFilter = columnFilter.filter((option) => option !== filterSelect);
    setColumnFilter(newColumnFilter);
    setNumericFilters([...numericFilters, numericFilter]);
  };

  return (
    <>
      <h1>Projeto Star War Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Dagobah"
        value={ searchPlanet }
        onChange={ handlePlanetFilter }
      />
      <hr />
      <label htmlFor="numeric-column-filter">
        Coluna
        <select
          name="numeric-column-filter"
          data-testid="column-filter"
          value={ filterSelect }
          onChange={ ({ target: { value } }) => { setfilterSelect(value); } }
        >
          {optionFilter()}
        </select>
      </label>

      <label htmlFor="numeric-operator-filter">
        Operador
        <select
          name="numeric-operator-filter"
          data-testid="comparison-filter"
          value={ operatorSelect }
          onChange={ ({ target: { value } }) => { setOperatorSelect(value); } }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        type="number"
        placeholder="0"
        data-testid="value-filter"
        value={ numericInput }
        onChange={ ({ target: { value } }) => { setNumericInput(value); } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumericFilter }
      >
        Filtrar

      </button>
      <hr />
      {numericFilters.map((filters) => (
        <p key={ uuid() }>
          {`${filters.filterSelect} ${filters.operatorSelect} ${filters.numericInput}`}
        </p>
      ))}
      <button type="button">Remover Filtro</button>
      <hr />
    </>
  );
}

export default Filter;
