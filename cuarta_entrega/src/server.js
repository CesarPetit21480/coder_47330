import http from "http";
import app from "./app.js";
import { Server } from "socket.io";

const server = http.createServer(app);
const socketServer = new Server(server);
const port = 8080;

socketServer.on("connection", (clienteSocket) => {
  console.log(`Nuevo cliente conectado 🎉 (${clienteSocket.id}).`);
 // clienteSocket.emit("start", messages);

  // clienteSocket.on('new-message', (data) => {
  //   messages.push({ socketId: clienteSocket.id, message: data });
  //   clienteSocket.broadcast.emit('notification', { socketId: clienteSocket.id, message: data });
  // });

  clienteSocket.on("disconnect", () => {
    console.log(`Cliente desconectado (${clienteSocket.id}) 😨.`);
  });
});

server.listen(port, () => {
  console.log(` escuchando http://localhost:${port}`);
});
