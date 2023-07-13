import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherModal from './WeatherModal';

describe('WeatherModal', () => {
  const mockWeatherData = {
    location: {
      name: 'San Francisco',
    },
    current: {
      temperature: 20,
      weather_icons: ['https://example.com/icon.png'],
      weather_descriptions: ['Sunny'],
      wind_speed: 10,
      wind_dir: 'N',
      pressure: 1012,
      humidity: 50,
      uv_index: 3,
      visibility: 10,
    },
    from_cache: true,
  };

  it('renders correctly with weather data', () => {
    render(
      <WeatherModal
        isModalVisible={true}
        handleOk={() => {}}
        handleCancel={() => {}}
        weather={mockWeatherData}
      />
    );

    expect(screen.getByText('Weather for San Francisco')).toBeInTheDocument();
    expect(screen.getByText('Successfully retrieved from cache.')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('10 km/h')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('1012 hPa')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10 km')).toBeInTheDocument();
  });

	it('does not render when modal is not visible', () => {
		render(
			<WeatherModal
				isModalVisible={false}
				handleOk={() => {}}
				handleCancel={() => {}}
				weather={mockWeatherData}
			/>
		);

		expect(screen.queryByText('Weather for San Francisco')).not.toBeInTheDocument();
		expect(screen.queryByText('Successfully retrieved from cache.')).not.toBeInTheDocument();
		expect(screen.queryByText('20°C')).not.toBeInTheDocument();
		expect(screen.queryByText('Sunny')).not.toBeInTheDocument();
		expect(screen.queryByText('10 km/h')).not.toBeInTheDocument();
		expect(screen.queryByText('1012 hPa')).not.toBeInTheDocument();
	});

  it('does not render weather data when not provided', () => {
		render(
			<WeatherModal
				isModalVisible={true}
				handleOk={() => {}}
				handleCancel={() => {}}
				weather={null}
			/>
		);
	
		expect(screen.queryByText('Weather for San Francisco')).not.toBeInTheDocument();
		expect(screen.queryByText('Successfully retrieved from cache.')).not.toBeInTheDocument();
	});	
});
