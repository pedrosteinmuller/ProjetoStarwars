import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';

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
  test('Verifica interação do usuário na aplicação', async () => {
    render(<App />);
    const inputName = screen.getByRole('textbox', { name: /nome:/i });
    const columnFilter = screen.getByRole('combobox', { name: /coluna:/i });
    const comparisonFilter = screen.getByRole('combobox', { name: /operador:/i });
    const valueFilter = screen.getByRole('spinbutton');
    const buttonFilter = screen.getByRole('button', { name: /adicionar filtro/i });

    userEvent.type(inputName, 'Tatooine');
    expect(inputName.value).toBe('Tatooine');

    userEvent.selectOptions(columnFilter, 'population');
    expect(columnFilter.value).toBe('population');

    userEvent.type(valueFilter, '10');
    expect(valueFilter.value).toBe('010');

    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.click(buttonFilter);
    console.log(comparisonFilter.value);
    expect(await comparisonFilter.value).toBe('maior que');

    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '1000');
    userEvent.click(buttonFilter);
    expect(await comparisonFilter.value).toBe('igual a');

    const buttonRemove = screen.getByRole('button', { name: /remover filtros/i });
    expect(buttonRemove).toBeInTheDocument();
  });
  test('Testando menor que', async () => {
    render(<App />);
    // userEvent.selectOptions(comparisonFilter, 'menor que');
    // userEvent.click(buttonFilter);
    // expect(await comparisonFilter.value).toBe('menor que');
    const columnFilter = screen.getByRole('combobox', { name: /coluna:/i });
    const comparisonFilter = screen.getByRole('combobox', { name: /operador:/i });
    const valueFilter = screen.getByRole('spinbutton');
    const buttonFilter = screen.getByRole('button', { name: /adicionar filtro/i });

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '500');
    userEvent.click(buttonFilter);
    await waitFor(() => expect(comparisonFilter).toHaveValue('menor que'));
    expect(await comparisonFilter.value).toBe('menor que');
    expect(await columnFilter.value).toBe('population');

    const allBtnRemove = screen.getAllByText(/remover/i);
    userEvent.click(allBtnRemove[0]);
  });
  // test('a', () => {
  //   render(<App />);
  // });
  test('Verifica resposta da API', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '10200');
    userEvent.click(buttonFilter);
  });
  test('Verifica as funcionalidades de excluir um filtro e todos simultâne', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => testData,
    }));
    render(<App />);

    const inputName = screen.getByTestId('name-filter');
    const columnFilter = screen.getByRole('combobox', { name: /coluna:/i });
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.type(inputName, 'Tatooine');
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.type(valueFilter, '10');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.click(buttonFilter);

    const buttonRemove = screen.getAllByText('Remover');
    expect(buttonRemove[0]).toBeInTheDocument();

    userEvent.click(buttonRemove[0]);
    expect(buttonRemove[0]).not.toBeInTheDocument();

    const buttonRemoveAll = await screen.findByTestId('button-remove-filters');

    expect(buttonRemoveAll).toBeInTheDocument();

    userEvent.click(buttonRemoveAll);
  });

  test('Verifica se o filtro de nome funciona ao digitar algo', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    const filterName = screen.getByTestId('name-filter');
    userEvent.type(filterName, 'Hoth');

    const tatooineName = await screen.findByText(/hoth/i);

    expect(tatooineName).toBeInTheDocument();
  });

  test('Verifica se ordenda de forma Ascendente e Desendente a coluna', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => testData,
    }));
    render(<App />);
    const columnSort = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const InputDesc = screen.getByTestId('column-sort-input-desc');
    const buttonOrder = screen.getByTestId('column-sort-button');

    expect(columnSort).toBeInTheDocument();
    expect(inputAsc).toBeInTheDocument();
    expect(InputDesc).toBeInTheDocument();
    expect(buttonOrder).toBeInTheDocument();

    const tatooineName = await screen.findByText(/tatooine/i);
    expect(tatooineName).toBeInTheDocument();

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(inputAsc);
    userEvent.click(buttonOrder);

    userEvent.click(InputDesc);
    userEvent.click(buttonOrder);
  });
});
