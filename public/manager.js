var socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", function (data) {
  render(data);
});

function render(data) {
  console.log(data);
  document.getElementById("messages").innerHTML = '';
  data.reverse().forEach(elem => renderMessage(elem));
}

function addMessage(elem) {
  var message = {
    author: elem.author,
    text: elem.text,
  };

  socket.emit("new-message", message);
  return false;
}

function renderMessage(elem) {
  var element = document.createElement("div");
  var author = document.createElement("strong");
  var message = document.createElement("em");
  var button = document.createElement("button");
  author.innerHTML = elem.author;
  message.innerHTML = elem.text;
  button.innerHTML = "SHOW";
  button.onclick = function () {
    addMessage(elem)
  };
  element.appendChild(author);
  element.appendChild(message);
  element.appendChild(button);
  document.getElementById('messages').appendChild(element);
}
