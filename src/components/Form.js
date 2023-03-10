import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Form() {
  const {
    name,
    handleName,
    column,
    comparator,
    quanty,
    options,
    removeAll,
    columnSort,
    handleQuantity,
    handleComparator,
    handleColumn,
    handleFilterSelect,
    filterByNumeric,
    removeFilter,
    sortAsc,
    sortDesc,
    sortRadio,
    columnSorted,
    handleButtonSort } = useContext(myContext);
  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            data-testid="name-filter"
            value={ name }
            onChange={ handleName }
          />
        </label>
        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            data-testid="column-filter"
            id="column"
            value={ column }
            onChange={ handleColumn }
          >
            {
              options.map((item) => (<option key={ item } value={ item }>{item}</option>))
            }
          </select>
        </label>
        <label htmlFor="operator">
          Operador:
          <select
            name="operator"
            data-testid="comparison-filter"
            id="operator"
            value={ comparator }
            onChange={ handleComparator }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ quanty }
          onChange={ handleQuantity }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterSelect }
        >
          Adicionar Filtro
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAll }
        >
          Remover Filtros
        </button>
        <div>
          {
            filterByNumeric?.map((item, index) => (
              <p key={ index } data-testid="filter">
                {`${item.column} ${item.comparison} ${item.value}`}
                <button onClick={ () => removeFilter(item.column) } type="button">
                  Remover
                </button>
              </p>
            ))
          }
        </div>
      </form>
      <form>
        <select
          value={ columnSort }
          data-testid="column-sort"
          onChange={ columnSorted }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="order"
            value="ASC"
            id="ASC"
            data-testid="column-sort-input-asc"
            onClick={ sortAsc }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="order"
            id="DESC"
            value="DESC"
            data-testid="column-sort-input-desc"
            onClick={ sortDesc }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={
            () => handleButtonSort({ order: { column: columnSort, sort: sortRadio } })
          }
        >
          Ordenar
        </button>
      </form>
    </div>
  );
}
