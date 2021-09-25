const interval_in_seconds = 10;
const messages = [
  { title: 'twitch.tv/', message: 'fernandoescolar' },
  { title: 'twitter.com/', message: 'fernandoescolar' },
  { title: 'instagram.com/', message: 'fernando.escolar' },
  { title: 'www.', message: 'developerro.com' },
];
const colors = [ 'blue', 'yellow', 'red', 'green' ];
let index = 0;

function formatColors(text) {
  let c = 0;
  let result = '';
  for (var i = 0; i < text.length; i++) {
    result += `<span class="${colors[c]}">${text.charAt(i)}</span>`;

    c++;
    if (c >= colors.length) c = 0;
  }

  return result;
}

function showSnackbar(content, ttl, callback, cssClass) {
  const root = document.getElementById("snackbar-panel");
  const x = document.createElement("div");
  x.className = "snackbar show " + cssClass;
  x.innerHTML = content;

  root.prepend(x);
  setTimeout(() => {
    x.className = x.className.replace("show", "hidden");
    setTimeout(() => {
      root.removeChild(x);
      if (callback) callback();
    }, ttl * 2000);
  }, ttl * 1000);
}

function setText(m) {
  var x = document.getElementById("snackbar");
  x.innerHTML = `${m.title}${formatColors(m.message)}`;
}

function show() {
  var x = document.getElementById("snackbar");
  x.className = "show";

  setTimeout(() => {
    x.className = x.className.replace("show", "hidden");
    next();
  }, interval_in_seconds * 1000);
}

function next() {
  const m = messages[index];
  showSnackbar(`${m.title}${formatColors(m.message)}`, interval_in_seconds, () => next())

  index++;
  if (index >= messages.length) index = 0;
}

next();

var socket = io.connect("http://localhost:8080", { forceNew: true });
socket.on("show-message", function (m) {
  showSnackbar(`${formatColors(m.author)}: ${m.text}`, interval_in_seconds, null, 'message');
});
