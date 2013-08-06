# config/initializers/pusher.rb
require 'pusher'

Pusher.url = "http://bfbd9871b401e629c48b:bb3a76627dbbd41bf7c3@api.pusherapp.com/apps/47233"
Pusher.logger = Rails.logger

# app/controllers/hello_world_controller.rb
class PusherController < ApplicationController
  def hello_world
    Pusher['test_channel'].trigger('my_event', {
      message: 'hello world'
    })
  end
end
