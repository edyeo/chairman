class ChangeStation < ActiveRecord::Migration
  def self.up
      add_column :stations, :code, :string
      add_column :stations, :fr_code, :string
  end

  def self.down
      remove_column :stations, :code, :string
      remove_column :stations, :fr_code, :string
  end

end
