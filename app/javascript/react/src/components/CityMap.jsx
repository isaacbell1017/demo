import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

const CityMap = () => {
	console.log('here')
  const [selectedCity, setSelectedCity] = React.useState(null);

  const cities = [
    { name: 'New York', location: [40.7128, -74.0060] },
    { name: 'Los Angeles', location: [34.0522, -118.2437] },
    // Add more cities as needed
  ];

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
				{cities.map(city => <Popup key={city.name} position={city.location}>{city.name}</Popup>)}
			</Marker>
		</MapContainer>
  );
}

export default CityMap;
