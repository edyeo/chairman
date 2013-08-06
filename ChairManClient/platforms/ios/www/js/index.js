//var hostserver="http://54.248.116.204:3000";
var chatserver="http://54.248.116.204:4567";

var hostserver="http://localhost:3000";
//var chatserver="http://localhost:4567";
var socket = null;
var nickname = null;


Date.prototype.timeNow = function(){ 
	return ((this.getHours() < 10)?"0":"") 
	+ ((this.getHours()>12)?(this.getHours()-12):this.getHours()) 
	+":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() 
	+ ((this.getHours()>12)?('PM'):'AM'); 
};




$(document).delegate('.ui-navbar ul li > a', 'click', function (){

    //un-highlight and highlight only the buttons in the same navbar widget
    $(this).closest('.ui-navbar').find('a').removeClass('ui-navbar-btn-active');

    //this bit is the same, you could chain it off of the last call by using two `.end()`s
    $(this).addClass('ui-navbar-btn-active');

    //this starts the same but then only selects the sibling `.content_div` elements to hide rather than all in the DOM
    //console.log($($(this).attr('href')));

	if (nickname == null && $(this).attr('href')=="#deal_div"){
		$($(this).attr('href')).show().siblings('.content_div').hide();
		$('#deal_room_div').show().siblings('.deal_div').hide();
	
		$("#deal_nickname_image_div").on('click', function(event){
			nickname = $('#deal_nickname_input').attr("value");
			console.log(nickname);
			
			socket = io.connect(chatserver);
			socket.emit('room','testroom');
		   	socket.emit('set nickname',nickname);
			
			socket.on('message', function(name,msg){

				console.log(name,msg);
				var newDate = new Date();
				$('#receive_message_div').append("<div class='chat_bubble_from_server'>"+msg+"&nbsp;&nbsp;&nbsp;<span id='deal_time'>"+newDate.timeNow()+"&nbsp"+name+"</span></div>");	
				$("#receive_message_div").scrollTop($("#receive_message_div")[0].scrollHeight);
			});
			
			$('#receive_message_div, #send_message_div').show();
			$('#deal_room_div').hide();

		});
	}
	else if (nickname!=null && $(this).attr('href')=="#deal_div"){
		$($(this).attr('href')).show().siblings('.content_div').hide();
		$('#receive_message_div, #send_message_div').show();
		$('#deal_room_div').hide();
		//.siblings('.deal_div').hide();
	}	
	else{
		$($(this).attr('href')).show().siblings('.content_div').hide();
	}
})

$(document).ready(function(){

	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = chatserver+"/socket.io/socket.io.js";
	$("head").append(s);


//	window.addEventListener("load",function() {
 //   setTimeout(function(){
 //   window.scrollTo(0, 0);
  //  }, 0);
 //	});

	var header_div_height=$(window).height()*0.25;
	var article_div_height=$(window).height()*0.75;

	$("header").css({ height:header_div_height});
	$("article").css({ height:article_div_height});
	$("article").css({ top:header_div_height});
//	$("html").css({ height:280});
	
	$("#search_div").show().siblings('.content_div').hide();
	
	$("#search_button").on('click', function(event){

		var req_station_name = $("#search_text").attr("value");
		var params = {"station_name" : req_station_name};
		
		if (req_station_name != "undefined" && req_station_name != "" && req_station_name != "null")
		{	
			$.ajax({
				crossDomain:true,
	            url : hostserver+"/getoff_infos/search?callback=?",
				data:{"station_name":req_station_name},
	            dataType : "JSONP",	
	 			success : function(data){
				
					if (data.seatlist.length == 0){
						$("#search_result_div").append("입력하신 역이 등록된것이 없사옵니다");
						$("#search_result_div").show().siblings('.content_div').hide();
					}else{
						var table = "";		
						var tbl_row1;
						var tbl_row2;
						var tbl_row3;
						var tbl_row4;
		
						$.each(data.seatlist, function(k,v){
							console.log(v);
							tbl_row1 = "";
							tbl_row2 = "";
							tbl_row3 = "";
							tbl_row4 = "";
					
							// tbl_row1 += "<tr><td>"+v.line_num+"</td><td> line# : "+v.container_num+"</td><td>	탑승칸 :"+ v.created_at+"</td></tr>";
							// tbl_row2 += "<tr><td>"+v.station_name+"</td><td>17 mins ago</td></tr>";
							// tbl_row3 += "<tr><td><span>"+v.hint+"</span></td></tr>";

							tbl_row1 += "<div class='div_search_result_card_row1'>"+"<div class='div_search_result_card_line_num'>"+v.line_num+"</div>"+"<div class='div_search_result_card_container_num'>"+v.container_num+"</div>"+"<div class='div_search_result_card_created_at'>"+v.created_at+"</div>"+"</div>"
							tbl_row2 += "<div class='div_search_result_card_row2'>"+"<div class='div_search_result_card_station_name'>"+v.station_name+"</div>"+"<div class='div_search_result_card_time_diff'>"+"<span class='span_search_result_time_diff'>"+ v.time_diff +"</span>"+"</div>"+"<div class='div_search_result_card_time_diff_ago'>"+"mins ago"+"</div>"+"</div>"
							tbl_row3 += "<div class='div_search_result_card_row3'>"+"<div class='div_search_result_card_hint'>"+"<span>"+v.hint+"</span>"+"</div>"+"</div>"

							table += "<div class='search_result_card'>"+tbl_row1+"&nbsp"+tbl_row2+"&nbsp"+tbl_row3+"</div>";
							

						})                   
                       	$(".search_result_card").remove();               
						$("#search_result_div").append(table);
						$("#search_result_div").show().siblings('.content_div').hide();
					}	
				}
	        })
		}
		else
		{
			alert("역 이름을 입력하세요!");
		}	
	})
	
	$("#register_button").on('click', function(event){
		
		var stn_name = $("#input_station_name").val();
		var line_num = $("#input_line_num").val();
		var ctn_num = $("#input_container_num").val();
		var hint = $("#input_hint").val();
		
		if (stn_name=="" || line_num=="" || ctn_num=="" || hint==""){
			alert("내리는 정보를 모두 입력해주세요~");
		}else{
			$.ajax({
				type:"post",
				url : hostserver+"/getoff_infos.json",
				data:{ "station_name":stn_name,"line_num":line_num,"container_num":ctn_num,"hint":hint  },

				success : function(){
						$("#register_div").show().siblings('.content_div').hide();
						alert("Thank you for your seat info!!");
				
			}
		})
		}
	})
	
	$('#deal_send_message_button').click(function(event) {
		event.preventDefault();
		
		// var notification = { notification: $('#message').val()};
		// // $.post( chatserver':4567/push', notification,'JSON');
		// 
		// $.ajax({
		// 	type : "post",
		// 	url : "http://localhost:4567/push",
		// 	data : notification ,
		// 	crossDomain : true,
		// 	success : function(){
		// 	
		// 	}
		// })

		// var input = $('#deal_send_message_input').val();
		// ws.send(input);
		// var newDate = new Date();
		// $('.receive_message_div').append("<div class='chat_bubble_to_server'>"+input+"&nbsp;&nbsp;&nbsp;<span id='deal_time'>"+newDate.timeNow()+"</span></div>");	
		// $(".receive_message_div").scrollTop($(".receive_message_div")[0].scrollHeight);
		// return false;
		
		var input = $('#deal_send_message_input').val();
		var newDate = new Date();
		
		socket.emit('message', input);
		$('#receive_message_div').append("<div class='chat_bubble_to_server'>"+input+"&nbsp;&nbsp;&nbsp;<span id='deal_time'>"+newDate.timeNow()+"&nbsp"+name+"</span></div>");	
		$("#receive_message_div").scrollTop($("#receive_message_div")[0].scrollHeight);
		return false;

	})
	
	// var es = new EventSource('http://localhost:4567/connect');
	// 
	// es.onmessage = function(e) {
	// 	alert.log("yeah");
	// 	var msg = $.parseJSON(data);
	// 
	// 	$('#receive_message_div').notify("create", {
	// 		title: msg.timestamp,
	// 		text: msg.notification
	// 	});
	// }
	

//	console.log(socket);


	
	
	// var ws = new WebSocket(chatserver+'/push');
	// ws.onmessage = function(m) { 
	// 	console.log('websocket message: ' + m.data); 
	// 	var newDate = new Date();
	// 	$('.receive_message_div').append("<div class='chat_bubble_from_server'>"+m.data+"&nbsp;&nbsp;&nbsp;<span id='deal_time'>"+newDate.timeNow()+"</span></div>");	
	// 	$(".receive_message_div").scrollTop($(".receive_message_div")[0].scrollHeight);
	// };
	// 
	

})





		




function visibleDivInContentDiv(selection){
	$(selection).show().siblings('.content_div').hide();
}
	


