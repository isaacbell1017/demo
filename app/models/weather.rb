=begin

Public Class Methods
	weather_for(location): returns the weather for that location. It does this by calling the private get method with the location as an argument.
	
Private Class Methods
	get(location): makes a HTTP GET request to the Weatherstack API to get the weather for that location. It parses the response and returns it. If the response is nil, it returns an empty hash.
	api_key(): returns the API key for the Weatherstack API. Raises an exception if the API key is not set.

=end

class Weather
	def self.weather_for(location)
		get(location)
	end

	private

	def self.get(location)
		response = HTTParty.get("http://api.weatherstack.com/forecast?access_key=#{api_key}&query=#{location}")

		response&.parsed_response || {}
	end

	def self.api_key
		@api_key ||= ENV['WEATHER_API_KEY']
		raise 'API Key needed for weather service' if !Rails.env.test? && @api_key.nil?
		
		@api_key
	end
end
