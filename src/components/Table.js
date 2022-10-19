import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Table() {
  const { data, name } = useContext(myContext);
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
        {
          data?.filter((el) => el.name.toUpperCase().includes(name.toUpperCase()))
            .map((item) => (
              <tr key={ item.name }>
                <td>{ item.name }</td>
                <td>{ item.rotation_period }</td>
                <td>{ item.orbital_period }</td>
                <td>{ item.diameter }</td>
                <td>{ item.climate }</td>
                <td>{ item.gravity }</td>
                <td>{ item.terrain }</td>
                <td>{ item.surface_water }</td>
                <td>{ item.population }</td>
                <td>
                  {
                    item.films.map((url) => (
                      <span key={ url }>
                        <a href={ url }>{url}</a>
                      </span>
                    ))
                  }
                </td>
                <td>{ item.created }</td>
                <td>{ item.edited }</td>
                <td>
                  <a href={ item.url }>{ item.url }</a>
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}
