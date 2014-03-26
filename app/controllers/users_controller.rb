class UsersController < ApplicationController

  respond_to :json
  
  def get_drivers
    # respond with json with all drivers who are availables
    respond_with User.where(role:"driver",status:"available")
  end

  def get_passengers
    # respond with json with all drivers who are available
    respond_with User.where(role:"passenger",status:"available")
  end
end