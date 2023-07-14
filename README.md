# Demo - Weather Map

This is a Rails 7 application with a React frontend.

The application uses the `react-leaflet` library to display an interactive map and the WeatherStack API to fetch weather data. It also utilizes Yarn, Jest, Babel, Redis, Tailwind, and ESBuild.

Note that while Devise and CanCan are installed, all authentication features have been avoided for simplicity.

https://github.com/IsaacBell/demo/assets/2613157/a606b937-3ba5-4ee2-9418-06eb696da2a4

## Features

- Interactive map of the United States with markers for selected cities.
- Click on a city marker to retrieve and display weather information for that city.
- Weather information is displayed in a modal window.

## Installation

1. Clone the repository:

```
git clone https://github.com/IsaacBell/demo.git
```

2. Navigate to the project directory:

```
cd demo
```

3. Install the dependencies:

```
yarn install
bundle install
```

4. Start the application:

```
./bin/dev
```

The application will start on `localhost:3000`.

## Usage

To use the application, click on a city marker on the map. A button will appear in a popup above the marker. Click on the "Get Forecast" button to retrieve weather information for that city. The weather information will be displayed in a modal window.

## Application

The entry point for React code is `app/javascript/react/src`. There are four components:

- App: a layout and entry point
- AddressForm: form and input
- CityMap: renders the map and popup markers
- WeatherModal: is displayed when we check the 

When a zip code is submitted, a request is sent to the `Weather#forecast` controller action. There, cache storage and retrieval is performed using Redis.

There is only one model on the back end: `Weather`. It calls the Weatherstack API.

```
Class Weather

Public Class Methods
	weather_for(location): returns the weather for that location. It does this by calling the private get method with the location as an argument.
	
Private Class Methods
	get(location): makes a HTTP GET request to the Weatherstack API to get the weather for that location. It parses the response and returns it. If the response is nil, it returns an empty hash.
	api_key(): returns the API key for the Weatherstack API. Raises an exception if the API key is not set.
```

## Testing

The application uses Rspec and Jest for testing. To run the tests, use the following commands:

```
rspec # Back end tests

yarn test # Front end tests
```

## Technical Considerations

Many configuration options were ignored for the purposes of this demo. For scalability, there are several things that can be done:

- Using append-only files (AOF) in Redis. Redis uses snapshots by default, which are vulnerable to failover. Enabling AOF allows Redis to maintain a record of all writes to the cache, which it can use to repopulate the cache in case of failure. We might, for instance, flush Redis' buffer to AOF storage every second. This can be used in conjunction with snapshots. However, this would require testing and planning for both performance and resource availability.
- Using a Write-Through Cache. This would ensure that the cache always contains the most up-to-date information. Assuming that weather updates are frequent and we are using some form of polling or socket connection, this will be more efficient than alternatives. 
- Create a Docker container for the app.

## License

[MIT](https://choosealicense.com/licenses/mit/)
