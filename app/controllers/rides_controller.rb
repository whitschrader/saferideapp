class RidesController < ApplicationController



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
    @ride.users.where(role:"passenger").each do |f|
      #send message "Your ride is arriving soon"
    end
    @ride.update_attributes(confirmed: true)
    respond_to do |f|
      f.json {render :json => @ride}
    end
  end



end
