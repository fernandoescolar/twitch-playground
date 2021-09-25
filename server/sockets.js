const server = require('./httpserver');
const io = require('socket.io')(server);
const store = require('./store');

io.on('connection', socket => {
    console.log('connected');
    socket.emit('messages', store.getMessages());

    socket.on('disconnect', () => {
      console.log('disconnected');
     });

    socket.on('new-message', (data) => {
      io.sockets.emit('show-message', data);
    });
});

module.exports = {
    showMessage: (data) => {
      io.sockets.emit('show-message', data);
    },
    sendMessages: () => {
        io.sockets.emit('messages', store.getMessages());
    }
};