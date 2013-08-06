class ChangeGetoffInfos < ActiveRecord::Migration
  def self.up
    rename_column :getoff_infos, :user_id, :user
    change_column :getoff_infos, :user, :string
  end

  def self.down
    rename_column :getoff_infos, :user, :user_id
    change_column :getoff_infos, :user_id, :integer
  end
end
