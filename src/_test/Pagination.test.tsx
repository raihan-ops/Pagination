import React from 'react';
import { render, screen } from '@testing-library/react';
import MYPagination from '../Compionent/MYPagination';




test('pagination render test', () => {
  render(<MYPagination/>);
  const page = screen.getByTestId("page");
  expect(page).toBeInTheDocument();
});