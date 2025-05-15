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

      // 1) Emitimos a TODOS la lista completa
      io.emit('users_online', Array.from(userSockets.keys()));
      io.emit('activities', Array.from(userActivities.entries()));
      io.emit('user_connected', userId);
    });

    socket.on('update_activity', ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit('activity_updated', { userId, activity });
    });

    socket.on('send_message', async (data) => {
      try {
        const { senderId, receiverId, content} = data;
        
        const [result] = await conn.query(
          `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`, [senderId, receiverId, content]
        )

        const newMessage = {
          messageId: result.insertId,
          senderId: senderId,
          receiverId: receiverId,
          content: content,
          created_at
        }

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverId) {
          io.to(receiverId).emit('receiver_message', message)
        }

        socket.emit('message_sent', message)

      } catch (error) {
        console.error('Message error socket: ', error);
        socket.emit('message_error', error.message);
      }
    })

    socket.on('disconnect', () => {
      // buscamos al usuario que se ha desconectado
      for (const [uid, sid] of userSockets.entries()) {
        if (sid === socket.id) {
          userSockets.delete(uid);
          userActivities.delete(uid);
          // 2) Broadcast de la lista actualizada
          io.emit('users_online', Array.from(userSockets.keys()));
          io.emit('user_disconnected', uid);
          break;
        }
      }
    });
  })
}