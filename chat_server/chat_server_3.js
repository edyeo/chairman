var io = require('socket.io').listen(4567);

io.sockets.on('connection', function (socket) {

   socket.on('room', function(room) {
      socket.join(room);
   });

   socket.on('set nickname', function (name) {
      socket.set('nickname', name, function(){
         console.log(name);
      });
   });

  socket.on('message', function (msg) {
   socket.get('nickname', function(err,name) {
      console.log('chat message by', name);
      socket.broadcast.to('testroom').emit('message',name,msg);
//      io.sockets.in('testroom').emit('message',name,msg);    
   });
  });
});
