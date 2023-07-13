require 'json'

class WeatherController < ApplicationController
  # before_action :authenticate_user!

  def forecast
    location = params.require(:location).to_s

    zip_code = location.presence&.size == 5 && location =~ /\D/ ? get_zip_from_location(location) : location

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

  private

  def get_zip_from_location(str)
    zip = str.match(/\d{5}/)&.to_s

    # We won't assume we always get a well-formatted address with zip code
    # If we receive a location string such as "New York", we can still convert it to a zip code
    zip ||= location.to_zip.first
    zip ||= Geocoder.search(location).first&.data&.send(:[], 'address')&.send(:[], 'postcode')

    zip
  end
end
