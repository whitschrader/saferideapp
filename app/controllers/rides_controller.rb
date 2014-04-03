class RidesController < ApplicationController

  include ApplicationHelper

  def create
    parameters = params.require(:ride).permit(:pickup_lat, :pickup_long, :dropoff_lat, :dropoff_long)
    @ride = Ride.create(parameters)
    @ride.users << current_user
    respond_to do |f|
      f.json {render :json => @ride}
    end
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
    @ride.users << current_user #adds the current user as driver

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
      @ride.update_attributes(canceled: true)
      cancel_message = "#{passengers[0].name} canceled their ride request"
      send_text_message(driver.id, cancel_message) if driver
      
    else
      # current_user is a driver
      cancel_message = "#{driver.name} canceled, other drivers still see your ride request"
      passengers.each do |p|
        send_text_message(p.id, cancel_message)
      end
    end


    #ride attribute confirmed to 'false'
    @ride.update_attributes(confirmed: false)

    #driver attribute status to 'available'
    driver.update_attributes(status: 'available') if driver
    
    #passenger attribute status to 'available'
    passengers.each do |p|
      p.update_attributes(status: 'available')
    end

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

    driver = @ride.users.where(role: "driver")[0] #taking an array, and taking the first element in that array
    passengers = @ride.users.where(role: "passenger")


    ride_completed_message = "#{driver.name} has completed your ride, thanks for using SafeRide!"
    passengers.each do |p|
      send_text_message(p.id, ride_completed_message)
    end


    
    respond_to do |f|
      f.json {render :json => @ride}
    end
  end





end
