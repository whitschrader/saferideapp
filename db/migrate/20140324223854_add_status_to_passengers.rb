class AddStatusToPassengers < ActiveRecord::Migration
  def change
    add_column :passengers, :status, :string
  end
end
