import React from 'react';
import { Modal, Descriptions, Image, Typography } from 'antd';

const { Text } = Typography;

const WeatherModal = ({ isModalVisible, handleOk, handleCancel, weather }) => {
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
