class GamesController < ApplicationController
  before_action :set_game, only: [:update]

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

  def update
    byebug
    # @game = Game.find_by(username: params["username"])
    # @game.update()
  end

  private

  # def game_params
  #   params.require(:game).permit(:score, :user_id)
  # end

  def set_game
    @game = Game.find(params[:id])
  end

end
