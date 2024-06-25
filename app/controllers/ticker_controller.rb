# frozen_string_literal: true

class TickerController < ApplicationController
  wrap_parameters format: [:json]

  def show
    stock = stock_params[:stock]
    start_date = stock_params[:start]
    end_date = stock_params[:end]

    @stock = polygon_api.by_range(stock, start_date, end_date)

    render json: @stock
  end

  private

  def stock_params
    params.permit(:stock, :start, :end)
  end

  def polygon_api
    @polygon_api ||= Services::PolygonApi.new
  end
end
