class User < ActiveRecord::Base
  attr_accessible :email, :name

  has_many :getoff_info
end
