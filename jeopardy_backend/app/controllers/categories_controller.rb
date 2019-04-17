class CategoriesController < ApplicationController

  def index
    @categories = Category.order("RANDOM()").limit(25)
    render json: @categories
  end

end
