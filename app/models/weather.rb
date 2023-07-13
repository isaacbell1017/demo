class Weather
	def self.weather_for(location)
		get(location)
	end

	private

	def self.get(location)
		response = HTTParty.get("http://api.weatherstack.com/forecast?access_key=#{api_key}&query=#{location}")

		response.parsed_response
	end

	def self.api_key
		@api_key ||= ENV['WEATHER_API_KEY']
		raise 'API Key needed for weather service' if !Rails.env.test? && @api_key.nil?
		
		@api_key
	end
end
