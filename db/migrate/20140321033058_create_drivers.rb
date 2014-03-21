class CreateDrivers < ActiveRecord::Migration
  def change
    create_table :drivers do |t|
      t.string :name
      t.string :phone
      t.string :location

      t.timestamps
    end
  end
end
