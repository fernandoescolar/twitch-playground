const sockets = require('./sockets');
const store = require('./store');
const openai = require('./openai');
const twitchEmoji = require('twitch-emoji');

function format(message) {
  return twitchEmoji.parse(message, { emojiSize : 'small' });
};

const tmi = require('tmi.js');
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  // identity: {
  //   username: 'Bot',
  //   password: `${process.env.TWITCH_OAUTH}`
  // },
  channels: [ 'fernandoescolar' ]
});

client.connect();
client.on('message', (channel, tags, message, self) => {
  const m = format(message);
  const data = { text: m, author: '@' + tags['display-name'] };

  if (tags['display-name'] === 'fernandoescolar' || tags['display-name'] === 'StreamElements') {
    if (m.startsWith('[!]')) {
      data.author = 'i';
      data.text = '<span class="yellow">' + message.substring(3).trim() + '</span>';
      sockets.showMessage(data);
    }
  }

  // if (tags['display-name'] !== 'StreamElements' && !message.startsWith('[bot]')) {
  //   let conversation = 'We are in a Twitch meeting. The channel name is "fernandoescolar". And we talk about programming.\n';
  //   store.getMessages().forEach(m => {
  //       conversation += `- ${m.author}: ${m.text}`;
  //   });
  //   conversation += '- @Bot: ';
  //   console.log('asking gpt3....');
  //   openai.complete(conversation, d => {
  //     console.log(d);
  //     const json = JSON.parse(d);
  //     client.say(channel, `[bot] ${json.choices[0].text}`);
  //   });
  // }

  store.addMessage(data);
  sockets.sendMessages();
});
