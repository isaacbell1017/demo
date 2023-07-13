import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./CityMap', () => () => <div>CityMap</div>);

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByText('Weather App')).toBeInTheDocument();

    expect(screen.getByText('Rails 7 Demo')).toBeInTheDocument();

    // expect(screen.getByText('CityMap')).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    expect(screen.getByText('Copyright @TBA 2023')).toBeInTheDocument();
  });
});
