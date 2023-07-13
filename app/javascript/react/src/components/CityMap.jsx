/*
State Variables
  selectedCity: The city that the user has selected. Initially null.
  weather: The weather data for the selected city. Initially null.
  isModalVisible: A boolean that determines whether the weather modal is visible. Initially false.
  addressModalVisible: A boolean that determines whether the address modal is visible. Initially false.
Constants
  cities: An array of city objects. Each object has a name and a location (an array of latitude and longitude coordinates).
  Functions
  handlePopupClick(city): A function that is called when the user clicks on a city marker. It sets selectedCity to the clicked city, fetches the weather data for that city, sets weather to the fetched data, and sets isModalVisible to true.
  handleOk(): A function that is called when the user clicks the "OK" button in the weather modal. It sets isModalVisible to false.
  handleCancel(): A function that is called when the user clicks the "Cancel" button in the weather modal. It sets isModalVisible to false.
  handleAddressSubmit(address): A function that is called when the user submits the address form. It fetches the weather data for the entered address, sets weather to the fetched data, sets isModalVisible to true, and sets addressModalVisible to false.
Rendered Components
  Button: A button that opens the address form when clicked.
  MapContainer: A map component from the react-leaflet library. It contains a TileLayer and a Marker for each city in the cities array.
  TileLayer: A tile layer component from the react-leaflet library.
  Marker: A marker component from the react-leaflet library. It contains a Popup with the city name and a button that opens the weather modal when clicked.
  Modal (address form): A modal component from the antd library. It contains the AddressForm component and is visible when addressModalVisible is true.
  AddressForm: A custom component that displays an address form. It calls handleAddressSubmit when the form is submitted.
  WeatherModal: A custom component that displays the weather data for the selected city. It is visible when isModalVisible is true.
*/

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';

import WeatherModal from './WeatherModal';
import AddressForm from './AddressForm';

const CityMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const cities = [
    { name: 'New York', location: [40.7128, -74.0060] },
    { name: 'Los Angeles', location: [34.0522, -118.2437] },
    { name: 'Chicago', location: [41.8781, -87.6298] },
    { name: 'Houston', location: [29.7604, -95.3698] },
    { name: 'Phoenix', location: [33.4484, -112.0740] },
    { name: 'Philadelphia', location: [39.9526, -75.1652] },
    { name: 'San Antonio', location: [29.4241, -98.4936] },
    { name: 'San Diego', location: [32.7157, -117.1611] },
    { name: 'Dallas', location: [32.7767, -96.7970] },
    { name: 'San Jose', location: [37.3382, -121.8863] },
    { name: 'Austin', location: [30.2672, -97.7431] },
    { name: 'Jacksonville', location: [30.3322, -81.6557] },
    { name: 'Fort Worth', location: [32.7555, -97.3308] },
    { name: 'Columbus', location: [39.9612, -82.9988] },
    { name: 'San Francisco', location: [37.7749, -122.4194] },
    { name: 'Charlotte', location: [35.2271, -80.8431] },
    { name: 'Indianapolis', location: [39.7684, -86.1581] },
    { name: 'Seattle', location: [47.6062, -122.3321] },
    { name: 'Denver', location: [39.7392, -104.9903] },
    { name: 'Washington', location: [38.9072, -77.0369] },
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

  const handleAddressSubmit = async (address) => {
		console.log(address);
    const response = await fetch(`/weather/forecast?location=${address}`);
    const data = await response.json();
    setWeather(data);
    setIsModalVisible(true);
    setAddressModalVisible(false);
  };

  return (
    <div className="map-container">
      <Button
        type="primary"
        size="large"
        icon={<SearchOutlined />}
        className="map-address-btn"
        onClick={() => setAddressModalVisible(true)}
        style={{backgroundColor: '#1677ff'}}
      >
        Enter Address
      </Button>
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

      <Modal
        title="Enter Your Address"
        visible={addressModalVisible}
        onCancel={() => setAddressModalVisible(false)}
        footer={null}
      >
        <AddressForm onSubmit={handleAddressSubmit} />
      </Modal>
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
