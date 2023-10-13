import { Server } from 'socket.io';

let io;
let messages = [];

export const init = (httpServer) => {
    io = new Server(httpServer);
    io.on('connection', (socketCLient) => {
        console.log(`Nuevo Cliente Conectado: ${socketCLient.id}`);

        socketCLient.emit('notification', { messages });

        socketCLient.broadcast.emit('new-client');

        socketCLient.on('new-message', (data) => {
            const { userName, text } = data;
            messages.push({ userName, text });
            io.emit('notification', { messages });
        })
    });
    console.log(`sever socket running 🚀🚀🚀`);


}