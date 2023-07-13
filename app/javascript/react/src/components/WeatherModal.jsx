/*
Props
  isModalVisible: A boolean that determines whether the modal is visible.
  handleOk: A function that is called when the user clicks the "OK" button in the modal.
  handleCancel: A function that is called when the user clicks the "Cancel" button in the modal.
  weather: The weather data for the selected city.
Rendered Components
  Modal: A modal component from the antd library. It is visible when isModalVisible is true and calls handleOk or handleCancel when the "OK" or "Cancel" button is clicked, respectively. It contains a Descriptions component if weather is not null.
  Descriptions: A descriptions component from the antd library. It contains several Descriptions.Item components that display various pieces of weather data, such as the temperature, weather description, wind speed, wind direction, pressure, humidity, UV index, and visibility. It also contains a Text component that displays a success message if the weather data was retrieved from the cache, or a danger message if it was not
*/

import React from 'react';
import { Modal, Descriptions, Image, Typography } from 'antd';

const { Text } = Typography;

const WeatherModal = ({ isModalVisible, handleOk, handleCancel, weather }) => {
	if (!weather) return <></>;

  return (
    <Modal 
      title={`Weather for ${weather?.location?.name}`} 
      visible={isModalVisible} 
      onOk={handleOk} 
      onCancel={handleCancel}
    >
      {weather && (
        <Descriptions column={1}>
					<Text type={weather.from_cache ? 'success' : 'danger'}>
						{weather.from_cache ? 'Successfully retrieved from cache.' : 'Unable to retrieve from cache.' }
					</Text>
          <Descriptions.Item label="Temperature">{weather.current.temperature}°C</Descriptions.Item>
          <Descriptions.Item label="Weather">
            <Image width={50} src={weather.current.weather_icons[0]} />
            {weather.current.weather_descriptions[0]}
          </Descriptions.Item>
          <Descriptions.Item label="Wind Speed">{weather.current.wind_speed} km/h</Descriptions.Item>
          <Descriptions.Item label="Wind Direction">{weather.current.wind_dir}</Descriptions.Item>
          <Descriptions.Item label="Pressure">{weather.current.pressure} hPa</Descriptions.Item>
          <Descriptions.Item label="Humidity">{weather.current.humidity}%</Descriptions.Item>
          <Descriptions.Item label="UV Index">{weather.current.uv_index}</Descriptions.Item>
          <Descriptions.Item label="Visibility">{weather.current.visibility} km</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default WeatherModal;
