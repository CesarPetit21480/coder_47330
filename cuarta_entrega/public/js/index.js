// (function () {
//     let messages = [];
//     const formMessage = document.getElementById('form-message');
//     const inputMessage = document.getElementById('input-message');
//     const showMessage = document.getElementById('show-message');

//     const socket = io();

//     formMessage.addEventListener('submit', (event) => {
//       event.preventDefault();
//       messages.push({
//         socketId: socket.id,
//         message: inputMessage.value,
//       });
//       socket.emit('new-message', inputMessage.value);
//       inputMessage.value = '';
//       inputMessage.focus();
//       updateMessages(messages);
//     });

//     function updateMessages(messages = []) {
//       showMessage.innerText = '';
//       messages.forEach((data) => {
//         const item = document.createElement('li');
//         item.innerText = `${data.socketId} -> ${data.message}`;
//         showMessage.appendChild(item);
//       })
//     }

//     socket.on('connect', () => {
//       console.log('Conectados al servidor');
//     });

//     socket.on('start', (data) => {
//       messages = data;
//       updateMessages(messages);
//     });

//     socket.on('notification', (data) => {
//       messages.push(data);
//       updateMessages(messages);
//     });

//   })();
(function () {

const imputMessage = document.getElementById("inputMessage");
const formChat = document.getElementById("formChat");
const container_messages = document.getElementById("container_messages");
const socket = io();
let messages = [];

formChat.addEventListener("submit", (event) => {
  event.preventDefault();

  messages.push({
    socketId: socket.id,
    message: imputMessage.value,
  });
  socket.emit('new-message', imputMessage.value);
  inputMessage.value = '';
  inputMessage.focus();
  updateMessages(messages);
});

const updateMessages = (message=[]) => {
  container_messages.innerText = "";
  message.forEach((msg) => {
    const elemento = document.createElement("li");
    elemento.innerText = `socket_id : ${msg.socketId} message: ${msg.message}`;
    container_messages.appendChild(elemento);
  });
};

socket.on('connect', () => {
    console.log('Conectados al servidor');
  });

  socket.on('start', (data) => {
    messages = data;
    updateMessages(messages);
  });

  socket.on('notification', (data) => {
    messages.push(data);
    updateMessages(messages);
  });


})();



