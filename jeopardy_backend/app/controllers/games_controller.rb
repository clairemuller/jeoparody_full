class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.create(username: params["username"])
    render json: @game
  end

  private

  def game_params
    params.require(:game).permit(:score, :user_id)
  end

end
