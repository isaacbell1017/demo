require 'rails_helper'

RSpec.describe "Weathers", type: :request do
  before do
    allow(ENV).to receive(:[]).with('WEATHER_API_KEY').and_return('12345')
    allow(HTTParty).to receive(:get).and_return(response)
  end
  
  describe "GET /forecast" do
    it "returns http success" do
      get "/weather/forecast", params: { location: "London" }
      expect(response).to have_http_status(:success)
    end
  end

end
