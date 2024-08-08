import React from 'react';
import { render, screen } from '@testing-library/react';
import AppWithRedux from './AppWithRedux';

test('renders learn react link', () => {
  render(<AppWithRedux />);
  const h3 = screen.getByText(/What to learn?/i);
  expect(h3).toBeInTheDocument();
});
