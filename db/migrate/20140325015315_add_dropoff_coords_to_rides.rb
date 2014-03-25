class AddDropoffCoordsToRides < ActiveRecord::Migration
  def change
    add_column :rides, :dropoff_lat, :float
    add_column :rides, :dropoff_long, :float
  end
end
