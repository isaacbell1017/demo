require 'json'

class WeatherController < ApplicationController
  # before_action :authenticate_user!

  def forecast
    location = params.require(:location).to_s

    zip_code = location =~ /\D/ ? location.to_zip.first : location

    if json = $redis.get(zip_code)
      weather = JSON.parse(json).with_indifferent_access
      weather[:from_cache] = true
    else
      weather = Weather.weather_for(zip_code)
      $redis.set(zip_code, weather.to_json, ex: 30 * 60) # Cache for 30 minutes
      weather[:from_cache] = false
    end

    render json: weather
  end
end
