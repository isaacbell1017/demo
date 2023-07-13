# Demo - Weather Map

This is a Rails 7 application with a React frontend.

The application uses the `react-leaflet` library to display an interactive map and the WeatherStack API to fetch weather data. It also utilizes Yarn, Jest, Babel, Redis, Tailwind, and ESBuild.

Note that while Devise and CanCan are installed, all authentication features have been avoided for simplicity.

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
```

4. Start the application:

```
./bin/dev
```

The application will start on `localhost:3000`.

## Usage

To use the application, click on a city marker on the map. A button will appear in a popup above the marker. Click on the "Get Forecast" button to retrieve weather information for that city. The weather information will be displayed in a modal window.

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

---

Please replace `https://github.com/IsaacBell/demo.git` with the actual URL of your repository. You might also want to add more details to the README, such as a section about the technologies used in the project, screenshots of the application, or instructions for setting up the WeatherStack API.