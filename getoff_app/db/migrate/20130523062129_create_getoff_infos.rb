class CreateGetoffInfos < ActiveRecord::Migration
  def change 
    create_table :getoff_infos do |t|
      t.integer :user_id
      t.integer :station_id
      t.string :time
      t.integer :number
      t.string :hint

      t.timestamps
    end
  end
end
