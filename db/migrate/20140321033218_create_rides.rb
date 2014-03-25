class CreateRides < ActiveRecord::Migration
  def change
    create_table :rides do |t|

      t.float :pickup_lat
      t.float :pickup_long
      t.float :pickup_lat
      t.float :pickup_long

      t.integer :driver_id
      t.integer :passenger_id
      t.boolean :started
      t.boolean :canceled
      t.boolean :completed




      t.timestamps
    end
  end
end
