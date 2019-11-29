var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var PORT = process.env.PORT || 8080;

var messages = [{
  id: 1,
  text: "Bienvenidos",
  author: "Aaron"
}]

app.use(express.static('public'));

app.get('/hello' , function(req, res) {
  res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket) {
  console.log('Alguien se conecto');
  socket.emit('messages', messages);

  socket.on('new-message',function(data){
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});
server.listen(PORT, function(){
  console.log("Servidor corriendo en 8080");
});
