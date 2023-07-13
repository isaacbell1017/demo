require 'rails_helper'

RSpec.describe Weather, type: :model do
  describe '.weather_for' do
    let(:location) { 'London' }
    let(:api_key) { 'your_api_key' }
    let(:response) { double('response', parsed_response: 'weather data') }

    before do
      allow(ENV).to receive(:[]).with('WEATHER_API_KEY').and_return(api_key)
      allow(HTTParty).to receive(:get).and_return(response)
    end

    it 'calls the Weatherstack API with the correct parameters' do
      expected_url = "http://api.weatherstack.com/forecast?access_key=#{api_key}&query=#{location}"
      Weather.weather_for(location)
      expect(HTTParty).to have_received(:get).with(expected_url)
    end

    it 'returns the parsed response from the API' do
      expect(Weather.weather_for(location)).to eq('weather data')
    end
  end

  describe '.api_key' do
    context 'when the API key is set' do
      let(:api_key) { 'your_api_key' }

      before do
        allow(ENV).to receive(:[]).with('WEATHER_API_KEY').and_return(api_key)
      end

      it 'returns the API key' do
        expect(Weather.api_key).to eq(api_key)
      end
    end
  end
end
