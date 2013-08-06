class FixColumnName < ActiveRecord::Migration
  def self.up
    rename_column :getoff_infos, :station_id, :station_name
    change_column :getoff_infos, :station_name, :string
  end

  def self.down
    rename_column :getoff_infos, :station_name, :station_id
    change_column :getoff_infos, :station_id, :integer
  end
end
