import React from 'react';
import Provider from './context/myProvider';
import Table from './components/Table';
import './App.css';
import Form from './components/Form';

function App() {
  return (
    <Provider>
      <Form />
      <Table />
    </Provider>
  );
}

export default App;
