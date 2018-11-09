var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var mongojs = require('mongojs');

var ObjectID = mongojs.ObjectID;
var db = mongojs('mongodb://localhost:27017/reactnative');
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;

websocket.on('connection', (socket) => {
  clients[socket.id] = socket;
  socket.on('userJoined', (userId) => onUserJoined(userId, socket));
  socket.on('message', (message) => onMessageReceived(message, socket));
});

websocket.on('connect', (socket) => {
  var user = db.collection('users').insert({}, (err, user) => {
    socket.emit('userJoined', user._id);
    users[socket.id] = user._id;
    _sendExistingMessages(socket);
  });
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
  console.log("USER JOINED", userId);
  try {
    // The userId is null for new users.
    if (!userId) {
      socket.emit('userJoined');

      var user = db.collection('users').insert({}, (err, user) => {
        socket.emit('userJoined', user._id);
        users[socket.id] = user._id;
        _sendExistingMessages(socket);
      });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(socket);

      //socket.emit('userJoined');
    }
  } catch(err) {
    console.log(err);
  }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  var userId = users[senderSocket.id];
  // Safety check.
  if (!userId) return;

  console.log("message - ", message.text)

  _sendAndSaveMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  var messages = db.collection('messages')
    .find()
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('message', messages.reverse());
    });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {

  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };

  db.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? websocket : socket.broadcast;
    emitter.emit('message', [message]);
  });

  // var emitter =  websocket;
  // emitter.emit('message', [message]);
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: "PC" }
  }, null /* no socket */, true /* send from server */);
});
