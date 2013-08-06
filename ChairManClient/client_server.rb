require 'json'
require 'sinatra'

set :public_folder, './'
set server: 'thin'
set :port, 9555


get '/www/index.html' do
  redirect '/www/index.html'
end
