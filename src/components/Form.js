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
    handleQuantity,
    handleComparator,
    handleColumn,
    handleFilterSelect } = useContext(myContext);
  return (
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
    </form>
  );
}
