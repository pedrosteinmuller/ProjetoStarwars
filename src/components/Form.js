import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Form() {
  const { name, handleName } = useContext(myContext);
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
    </form>
  );
}
