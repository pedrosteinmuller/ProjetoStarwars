import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

const arrayOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState(arrayOptions[0]);
  const [options, setOptions] = useState(arrayOptions);
  const [filterByNumeric, setFilterByNumeric] = useState([]);
  const [comparator, setComparator] = useState('maior que');
  const [quanty, setQuanty] = useState(0);

  const handleName = ({ target: { value } }) => { setName(value); };
  const handleColumn = ({ target: { value } }) => { setColumn(value); };
  const handleQuantity = ({ target: { value } }) => { setQuanty(value); };
  const handleComparator = ({ target: { value } }) => { setComparator(value); };

  const handleFilter = useCallback((arrayAllFilters) => {
    let newPlanets = data;
    arrayAllFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        newPlanets = newPlanets
          .filter((item) => Number(item[filter.column]) > Number(filter.value));
      }
      if (filter.comparison === 'menor que') {
        newPlanets = newPlanets
          .filter((item) => Number(item[filter.column]) < Number(filter.value));
      }
      if (filter.comparison === 'igual a') {
        newPlanets = newPlanets
          .filter((item) => Number(item[filter.column]) === Number(filter.value));
      }

      const filterOptions = options.filter((item) => item !== filter.column);
      setOptions(filterOptions);
      setColumn(filterOptions[0]);
    });
    setData2(newPlanets);
  }, [data, options]);

  const handleFilterSelect = useCallback(() => {
    const newObject = {
      column, comparison: comparator, value: quanty,
    };
    const arrayAllFilters = [...filterByNumeric, newObject];
    setFilterByNumeric(arrayAllFilters);
    handleFilter(arrayAllFilters);
  }, [column, comparator, quanty, filterByNumeric, handleFilter]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const result = results.filter((element) => delete element.residents);
      setData(result);
      setData2(result);
    };

    requestAPI();
  }, []);

  const removeFilter = useCallback((e) => {
    const removeItem = filterByNumeric.filter((item) => item.column !== e);
    setFilterByNumeric(removeItem);
    const filtered = arrayOptions.filter((option) => {
      const optionsRemoved = removeItem.map((e1) => e1.column);
      return !optionsRemoved.includes(option);
    });
    setOptions(filtered);
    setColumn(filtered[0]);
    handleFilter(removeItem);
  }, [filterByNumeric, handleFilter]);

  const removeAll = useCallback(async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const result = results.filter((element) => delete element.residents);
    setData2(result);
    setFilterByNumeric([]);
    setColumn(arrayOptions[0]);
    setOptions(arrayOptions);
  }, []);

  const context = useMemo(() => (
    { data,
      name,
      column,
      comparator,
      quanty,
      data2,
      options,
      filterByNumeric,
      handleColumn,
      handleComparator,
      handleQuantity,
      handleName,
      handleFilterSelect,
      removeAll,
      removeFilter,
    }), [data, name, column, comparator, quanty,
    data2, options, filterByNumeric,
    handleFilterSelect, removeAll, removeFilter]);

  return (<MyContext.Provider value={ context }>{children}</MyContext.Provider>);
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
