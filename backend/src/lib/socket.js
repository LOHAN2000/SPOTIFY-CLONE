import { Server } from 'socket.io'
import { conn } from "../config/db.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    }
  })

  const userSockets = new Map();
  const userActivities = new Map();

  io.on('connection', (socket) => {

    socket.on('user_connected', (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, 'Idle');

      io.emit('user_connected', userId);

      socket.emit('users_online', Array.from(userSockets.keys()));

      io.emit('activities', Array.from(userActivities.entries()));
    })

    socket.on('update_activity', ({userId, activity}) => {
      userActivities.set(userId, activity)
      io.emit('activity_updated', {userId, activity})
    })

    socket.on('send_message', async (data) => {
      try {
        const { senderId, receiverId, content} = data;
        // TODO guardar el mensaje en la db
      } catch (error) {
        
      }
    })
  })


}