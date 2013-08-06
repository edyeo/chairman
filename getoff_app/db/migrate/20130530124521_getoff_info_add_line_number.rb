class GetoffInfoAddLineNumber < ActiveRecord::Migration
  def up
    add_column :getoff_infos, :line_num, :string
    add_column :getoff_infos, :container_num, :string
  end

  def down
    remove_column :getoff_infos, :line_num
    remove_column :getoff_infos, :container_num
  end
end
