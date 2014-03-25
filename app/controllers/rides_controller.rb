class RidesController < ApplicationController


  def create
    parameters = params.require(:ride).permit(:pickup_lat, :pickup_long, :dropoff_lat, :dropoff_long)

    binding.pry


  end

end
