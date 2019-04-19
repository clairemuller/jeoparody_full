class UsersController < ApplicationController
  # before_action :set_user, only: [:destroy]

  def index
    @users = User.all
    render json: @users
  end

  def new
    @user = User.new
  end

  def create
    @user = User.find_or_create_by(username: params["username"])
    @game = Game.create({score: 0, user_id: @user.id})
    render json: @user
  end

  def update
    @user = User.find_by(username: params["username"])
    @game = @user.games.last
    @game.update(score: params["score"])
  end

  def destroy
    @user.delete
  end

  private

  # def user_params
  #   params.require(:user).permit(:username)
  # end

  def set_user
    @user = User.find(params[:id])
  end

end
