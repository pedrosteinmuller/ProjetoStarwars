import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  const handleName = ({ target }) => {
    setName(target.value);
  };

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

  const context = React.useMemo(() => ({
    data,
    name,
    handleName,
  }), [data, name]);

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
