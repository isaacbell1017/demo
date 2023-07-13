import React, { useState } from 'react';
import { Button, Modal, Row } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import WeatherModal from './WeatherModal';

const CityMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cities = [
    { name: 'New York', location: [40.7128, -74.0060] },
    { name: 'Los Angeles', location: [34.0522, -118.2437] },
    // Add more cities as needed
  ];

  const handlePopupClick = async (city) => {
    setSelectedCity(city);
    const response = await fetch(`/weather/forecast?location=${city.name}`);
    const data = await response.json();
    setWeather(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="map-container">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker key={city.name} position={city.location}>
            <Popup>
              {city.name}
              <br />
              <br />
              <Button onClick={() => handlePopupClick(city)} variant="contained" color="primary">
                Get Forecast
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
			<WeatherModal 
        isModalVisible={isModalVisible} 
        handleOk={handleOk} 
        handleCancel={handleCancel} 
        weather={weather} 
      />
    </div>
  );
}

export default CityMap;
