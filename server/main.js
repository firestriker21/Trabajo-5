var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 8080;

app.get('/',function(req,res){
	//request : son cabeceras y datos que nos envia el navegador.
	//response : son todo lo que enviamos desde el servidor.
	res.sendFile(__dirname + '/index.html');
});
io.on('connection',function(socket){
	console.log("usuario id : %s",socket.id);
	var channel = 'channel-a';
	socket.broadcast.emit('message','El usuario '+socket.id+' se ha conectado!','System');
	socket.join(channel);
	socket.on('message',function(msj){
		//io.emit('message',msj,socket.id);

		io.sockets.in(channel).emit('message',msj,socket.id); //enviar a todos del canal
		//socket.broadcast.to(channel).emit('message',msj,socket.id); //enviar a todos del canal menos a mi
	});
	socket.on('disconnect',function(){
		console.log("Desconectado : %s",socket.id);
	});
	socket.on('change channel',function(newChannel){
		socket.leave(channel);
		socket.join(newChannel);
		channel = newChannel;
		socket.emit('change channel',newChannel);
	});
});
http.listen(PORT,function(){
	console.log('el servidor esta escuchando el puerto %s',PORT);
});
/*var express = require('express');
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
*/
