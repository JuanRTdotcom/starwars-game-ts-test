import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Page from '@routes/fama/+page.svelte';

const mock = {
  ranking: [
    { nombreUsuario: 'Luke', puntuacion: 123 },
    { nombreUsuario: 'Leia', puntuacion: 29 },
    { nombreUsuario: 'Han', puntuacion: 8 }
  ]
};

test('Renderizado correcto', () => {
  const { getByText } = render(Page, { props: { data: mock } });

  expect(getByText('Luke')).toBeInTheDocument();
  expect(getByText('Leia')).toBeInTheDocument();
  expect(getByText('Han')).toBeInTheDocument();

  expect(getByText('123')).toBeInTheDocument();
  expect(getByText('29')).toBeInTheDocument();
  expect(getByText('8')).toBeInTheDocument();
});
