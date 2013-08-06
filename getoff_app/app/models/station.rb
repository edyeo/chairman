require "rubygems"
require "json"
require "net/http"
require "uri"

class Station < ActiveRecord::Base
  attr_accessible :line, :name, :code, :fr_code

  has_many :getoff_info


	#GET ActiveRecord connection
	def self.do_insert(name,code,line,fr_code)
	  Station.create(:name => name, :code => code, :line => line, :fr_code => fr_code)
	end

    def self.refresh
      auth_key = "66696c6d383232313230"
	  type = "json"
	  target = "SearchSTNBySubwayLineService"
	  idx_start = "1"
	  idx_end = "200"
	  line_list = ["1","2","3","4","5","6","7","8","9","I","K","B","J","A","G"]
	
        line_list.each do |line_number|
	    
		uri = URI.parse("http://openAPI.seoul.go.kr:8088/#{auth_key}/#{type}/#{target}/#{idx_start}/#{idx_end}/#{line_number}")
		http = Net::HTTP.new(uri.host, uri.port)
		request = Net::HTTP::Get.new(uri.request_uri)
		
		response = http.request(request)
		
		if response.code == "200"
		
		  # API response with header
		  result = JSON.parse(response.body)
		  
		  # parse data to get rid of header info
		  data = result["SearchSTNBySubwayLineService"] 
		  list_total_cnt = data["list_total_count"]
		  st_list_arr = data["row"]
		  
		  # extract each station info
		  st_list_arr.each do |st|
		    name = st["STATION_NM"]
	        code = st["STATION_CD"]
	        line = st["LINE_NUM"]
	        fr_code = st["FR_CODE"]
	
	        do_insert(name,code,line,fr_code)
            #Station.create(:name => name, :code => code, :line => line, :fr_code => fr_code)
          end
		else
		  puts "ERROR!!!"
		end
	end
    end
end
