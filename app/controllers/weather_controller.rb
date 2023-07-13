class WeatherController < ApplicationController
  # before_action :authenticate_user!

  def forecast
    location = params.require(:location)
    weather = Weather.weather_for(location)
    render json: weather
  end
end
