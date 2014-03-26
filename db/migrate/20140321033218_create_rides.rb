class CreateRides < ActiveRecord::Migration
  def change
    create_table :rides do |t|

      t.float :pickup_lat
      t.float :pickup_long
      t.float :pickup_lat
      t.float :pickup_long

      
      t.boolean :started
      t.boolean :canceled
      t.boolean :completed




      t.timestamps
    end
  end
end
