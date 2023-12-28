import { Server } from 'socket.io';

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (client) => {
    client.on('join_room', (data) => {
      client.join(data);
    });
    client.on('Message sent', (data) => {
      client.to(data.room).emit('recieve_message', data.message);
    });
  });

  return io;
};
