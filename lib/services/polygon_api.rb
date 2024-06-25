# frozen_string_literal: true

module Services
  class PolygonApi
    include HTTParty
    base_uri 'https://api.polygon.io/v2/aggs/ticker'

    def initialize
      @api_key = ENV['POLYGON_API_KEY']
    end

    def by_range(stock = '', start_date = '2023-01-01', end_date = '2023-12-31')
      @stock = stock
      @start_date = start_date
      @end_date = end_date

      self.class.get(
        "/#{@stock}/range/1/day/#{@start_date}/#{@end_date}",
        query: { apiKey: @api_key }
      )
    end
  end
end
