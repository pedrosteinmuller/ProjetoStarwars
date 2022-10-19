import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparator, setComparator] = useState('maior que');
  const [quanty, setQuanty] = useState(0);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const handleQuantity = ({ target: { value } }) => {
    setQuanty(value);
  };

  const handleComparator = ({ target: { value } }) => {
    setComparator(value);
  };

  const handleFilterSelect = useCallback(() => {
    switch (comparator) {
    case 'maior que': {
      const arrayFiltered = data.filter((item) => +item[column] > +quanty);
      setData(arrayFiltered);
    }
      break;
    case 'menor que': {
      const arrayFiltered = data.filter((item) => +item[column] < +quanty);
      setData(arrayFiltered);
    }
      break;
    case 'igual a': {
      const arrayFiltered = data.filter((item) => +item[column] === +quanty);
      setData(arrayFiltered);
    }
      break;
    default:
      return comparator;
    }
  }, [data, column, comparator, quanty]);

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();
        const result = results.filter((element) => delete element.residents);
        setData(result);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    requestAPI();
  }, []);

  const context = useMemo(() => ({
    data,
    name,
    column,
    comparator,
    quanty,
    handleColumn,
    handleComparator,
    handleQuantity,
    handleName,
    handleFilterSelect,
  }), [data, name, column, comparator, quanty, handleFilterSelect]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
