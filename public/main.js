var socket = io();//.connect('http://chatnode5.herokuapp.com/',{'forceNew':true});

socket.on('messages',function(data){
  console.log(data);
  render(data);
})

function render(data){
  var html =  data.map(function(data, index){
    return(`<div>
              <strong>${data.author}</strong>:
              <em>${data.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('output').innerHTML = html;
}
function addMessage(e) {
  var payload = {
    author: document.getElementById('username').value,
    text:document.getElementById('texto').value
  };

  socket.emit('new-message',payload);
  return false;
}
