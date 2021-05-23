// server.js
const express = require("express");
const path = require("path");
const route = require("./routes/route");
var app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

app.use('/', route);
const { slots } = require('./util/slots.js');

var cron = require('node-cron');


cron.schedule('*/3 * * * * *', () => {
   slots();
});


// start server
var port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log("Express running on " + port);
});

io.sockets.on('connection', function (socket) {
  console.log("connection");	
  // setInterval(function(counter){
  //   io.sockets.emit('counter', counter);
  //   counter--;
  //   if (counter === 0) {
  //     io.sockets.emit('counter', "Congratulations You WON!!");
  // 	}
  // }, 1000);
});
global.socket = io;


