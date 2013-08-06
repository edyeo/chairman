class GetoffInfo < ActiveRecord::Base
  attr_accessible :hint, :number, :station_name, :time

  belongs_to :station
end
