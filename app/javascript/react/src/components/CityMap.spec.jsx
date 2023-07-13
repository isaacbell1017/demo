import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CityMap from './CityMap';

/* TODO: Make these tests work. `react-leaflet` encounters issues w/ Jest */ 

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ weather: 'sunny' }),
  })
);

describe('CityMap', () => {
  test.skip('renders CityMap component', () => {
    render(<CityMap />);
    expect(screen.getByText(/Enter Address/i)).toBeInTheDocument();
  });

  test.skip('opens modal on Enter Address button click', async () => {
    render(<CityMap />);
    fireEvent.click(screen.getByText(/Enter Address/i));
    await waitFor(() => screen.getByText(/Enter Your Address/i));
    expect(screen.getByText(/Enter Your Address/i)).toBeInTheDocument();
  });

  test.skip('calls fetch with the correct data when a city is clicked', async () => {
    render(<CityMap />);
    fireEvent.click(screen.getByText(/New York/i));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/weather/forecast?location=New York');
  });

  test.skip('displays weather data when a city is clicked', async () => {
    render(<CityMap />);
    fireEvent.click(screen.getByText(/New York/i));
    await waitFor(() => screen.getByText(/sunny/i));
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
  });
});
