class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :oauth_token
      t.datetime :oauth_expires_at
      t.integer :phone
      t.float :current_lat
      t.float :current_long
      t.string :status
      t.string :role

      t.timestamps
    end
  end
end
