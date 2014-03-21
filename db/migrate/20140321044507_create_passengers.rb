class CreatePassengers < ActiveRecord::Migration
  def change
    create_table :passengers do |t|
      t.string :name
      t.integer :phone
      t.string :location
      t.string :child_name

      t.timestamps
    end
  end
end
