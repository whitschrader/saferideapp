class RidesController < ApplicationController

  include ApplicationHelper

  def create
    parameters = params.require(:ride).permit(:pickup_lat, :pickup_long, :dropoff_lat, :dropoff_long)
    ride = Ride.create(parameters)
    ride.users << current_user
    render json: {}, status: 201
  end

  def index
  end

  def get_avail_rides
   @rides = Ride.where(confirmed: false, started: false, canceled: false, completed: false)
    respond_to do |f|
      f.json {render :json => @rides}
    end
  end

  def confirm_ride
    current_user.status = 'unavailable'
    id = params['id'].to_i
    @ride = Ride.find(id)
    @ride.update_attributes(confirmed: true)

    passengers = @ride.users.where(role: "passenger")
    confirmation_message = "#{current_user.name} confirmed your ride!"

    passengers.each do |p|
      send_text_message(p.id, confirmation_message)
    end

    respond_to do |f|
      f.json {render :json => @ride}
    end
  end


  def cancel_ride
    #the id of the button is passed, but this is also the id of the ride
    id = params['id'].to_i
    @ride = Ride.find(id)

    driver = @ride.users.where(role: "driver")[0] #taking an array, and taking the first element in that array
    passengers = @ride.users.where(role: "passenger")

    if current_user.role == "passenger"
      #ride attribute canceled to 'true'
    end

    #ride attribute confirmed to 'false'
    #driver attribute status to 'available'
    #passenger attribute status to 'available'

    
    respond_to do |f|
      f.json {render :json => @ride}
    end
  end

  def start_ride
    #the id of the button is passed, but this is also the id of the ride
    id = params['id'].to_i
    @ride = Ride.find(id)
    
    #change ride attribute started to true
    @ride.update_attributes(started: true)

    
    respond_to do |f|
      f.json {render :json => @ride}
    end
  end

  def complete_ride
    #the id of the button is passed, but this is also the id of the ride
    id = params['id'].to_i
    @ride = Ride.find(id)

    #change ride attribute completed to true
    @ride.update_attributes(completed: true)

    
    respond_to do |f|
      f.json {render :json => @ride}
    end
  end





end
