class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.belongs_to :user, index: true
      t.belongs_to :ride, index: true

      t.timestamps
    end
  end
end
