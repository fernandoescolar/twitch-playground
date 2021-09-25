const server = require('./server/httpserver');
const sockets = require('./server/sockets');
const twitch = require('./server/twitch')


// const twitch = require('./twitch-client');

// getLastFollower('fernandoescolar');

// async function getLastFollower(channel) {
//   const result = await twitch.getLastFollower(channel);
//   io.sockets.emit("last-follower", messages);
// }