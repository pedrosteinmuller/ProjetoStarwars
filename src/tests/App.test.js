import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando aplicação StarWars', () => {
  test('Verifica se os elementos de filtrar são renderizados', () => {
    render(<App />);
    const inputText = screen.getByRole('textbox', { name: /nome:/i });
    const columnSelect = screen.getByRole('combobox', { name: /coluna:/i });
    const operatorSelect = screen.getByRole('combobox', { name: /operador:/i });
    const buttonFilter = screen.getByRole('button', { name: /adicionar filtro/i });
    expect(inputText).toBeInTheDocument();
    expect(columnSelect).toBeInTheDocument();
    expect(operatorSelect).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });
  test('Verifica interação do usuário na aplicação', () => {
    render(<App />);
    const inputName = screen.getByTestId('name-filter');
    const columnFilter = screen.getByRole('combobox', { name: /coluna:/i });
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.type(inputName, 'Tatooine');
    expect(inputName.value).toBe('Tatooine');

    userEvent.selectOptions(columnFilter, 'population');
    expect(columnFilter.value).toBe('population');

    userEvent.type(valueFilter, '10');
    expect(valueFilter.value).toBe('010');

    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.click(buttonFilter);
    expect(comparisonFilter.value).toBe('maior que');

    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(buttonFilter);
    expect(comparisonFilter.value).toBe('menor que');

    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.click(buttonFilter);
    expect(comparisonFilter.value).toBe('igual a');
  });
  // test('Verifica resposta da API', () => {
  //   render(<App />);
  // });
});
