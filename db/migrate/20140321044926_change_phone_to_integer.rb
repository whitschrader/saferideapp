class ChangePhoneToInteger < ActiveRecord::Migration
  def change 
    change_table :drivers do |d|
      d.remove :phone
      d.integer :phone
    end
  end
end


