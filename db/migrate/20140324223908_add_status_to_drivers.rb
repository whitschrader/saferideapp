class AddStatusToDrivers < ActiveRecord::Migration
  def change
    add_column :drivers, :status, :string
  end
end
