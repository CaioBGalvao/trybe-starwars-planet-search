import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import StarWarsContext from './StartWarsContext';
import './Table.css';

function Table() {
  const { filteredPlanets } = useContext(StarWarsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((categories) => (
          <tr key={ uuid() }>
            <td>{categories.name}</td>
            <td>{categories.rotation_period}</td>
            <td>{categories.orbital_period}</td>
            <td>{categories.diameter}</td>
            <td>{categories.climate}</td>
            <td>{categories.gravity}</td>
            <td>{categories.terrain}</td>
            <td>{categories.surface_water}</td>
            <td>{categories.population}</td>
            <td>
              {categories.films.map((film, index) => (
                index === categories.films.length - 1
                  ? <a href={ film } key={ uuid() }>{film}</a>
                  : <a href={ film } key={ uuid() }>{`${film}`}</a>))}
            </td>
            <td>{categories.created}</td>
            <td>{categories.edited}</td>
            <td><a href={ categories.url } key={ uuid() }>{categories.url}</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
