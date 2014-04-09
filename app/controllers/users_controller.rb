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

  def init_role
    #initialize user.role to 'passenger'
    current_lat = params["coordinates"]["latitude"].to_f
    current_long = params["coordinates"]["longitude"].to_f
    current_user.update_attributes(role: 'passenger', status: 'available', current_lat: current_lat, current_long: current_long)
    respond_with current_user.role
  end

  def switch_to_driver
    current_user.update_attributes(role:"driver") 
    respond_with current_user.role
  end

  def switch_to_passenger
    current_user.update_attributes(role:"passenger") 
    respond_with current_user.role
  end

  def sign_in
  end

  def check_phone
    @user = current_user 
  end

  def update_phone
    phone = params["user"]["phone"].to_i
    current_user.update_attributes(phone: phone)
    redirect_to root_path
  end






end