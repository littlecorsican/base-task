import { render, screen } from '@testing-library/react';
import App from './App';
import Inventory from './pages/Inventory';
import { addExtraZero, iSOToReadable, request } from './utils/helpers'

test('test render APP', () => {
  render(<App />);
  const linkElement = screen.getByText(/Inventory Management System/i);
  expect(linkElement).toBeInTheDocument();
});

test('test addExtraZero function', () => {
  expect(addExtraZero("1")).toBe("01")
});

test('test iSOToReadable function', () => {
  expect(iSOToReadable("2024-03-13T11:00:46.724Z")).toBe("13-03-2024")
});