class HomeController < ApplicationController
  def index
    $redis.set('key', 'value')
    @test = $redis.get('key')
  end

  def weather
  end
end
