const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { response } = require('express');
const path = require('path');

io.on('connection', socket => {
  console.log('a user connected');
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});

app.get('/', (request, response) => {
  response.json({
    name: 'Nguyen Thanh Huyen',
    nickname: 'Lionel'
  });
});

app.get('/about', (request, response) => {
  res.send('The about page');
});
app.get('/contact', (req, res) => {
  res.send('The contact page');
});
app.get('/contact', (req, res) => {
  res.send('The contact page');
});
app.get('/', (req, res) => {
  res.send('The home page');
});
app.get('*', function (req, res) {
  res.header(404);
  res.send('page not found');
});
