class CreateRides < ActiveRecord::Migration
  def change
    create_table :rides do |t|

      t.float :pickup_lat
      t.float :pickup_long
      t.float :pickup_lat
      t.float :pickup_long

      
      t.boolean :started,:default => false
      t.boolean :canceled, :default => false
      t.boolean :completed,:default => false
      t.boolean :confirmed,:default => false


      t.timestamps
    end
  end
end
