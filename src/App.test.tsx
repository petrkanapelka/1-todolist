import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const h3 = screen.getByText(/What to learn?/i);
  expect(h3).toBeInTheDocument();
});
