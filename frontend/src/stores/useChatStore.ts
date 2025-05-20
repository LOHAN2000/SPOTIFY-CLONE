import { create } from 'zustand';
import { io } from 'socket.io-client';
import { axiosInstance } from '@/lib/axios';
import { Message, User } from '@/types';

interface ChatStore {
  users: User[] | null;
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string> ;
  messages: Message[];
  selectedUser: User | null;

  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnetSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

const baseUrl = 'http://localhost:5000'

const socket = io(baseUrl, {
  autoConnect: false,
  withCredentials: true
})

export const useChatStore = create<ChatStore>((set, get) => ({

  users: [],
  isLoading: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  setSelectedUser: (user) => {
    set({ selectedUser: user })
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null})
    try {
      const response = await axiosInstance.get('/users/')
      set({users: response.data})
    } catch (error: any) {
      set({error: error.response.data.message})
    } finally {
      set({isLoading: false})
    }
  },

  initSocket: (userId: string) => {
    if (!get().isConnected) {
      socket.auth = {userId};
      socket.connect();
      socket.emit('user_connected', userId)

      set({ socket, isConnected: true });

      socket.on('users_online', (users: string[]) => {
        set({ onlineUsers: new Set(users)})
      })

      socket.on('activities', (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) })
      })

      socket.on('user_connected', (userId: string) => {
        set((state) => ({ onlineUsers: new Set([ ...state.onlineUsers, userId ]) }))
      })

      socket.on('receive_message', (message: Message) => {
        console.log('hola')
        set((state) => ({ messages: [ ...state.messages, message ] }))
      })

      socket.on('message_sent', (message: Message) => {
        set((state) => ({ messages: [ ...state.messages, message] }))
      })

      socket.on('activity_updated', ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities }
        })
      })
    }
  },

  disconnetSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit('send_message', { receiverId, senderId, content });
  },

  fetchMessages: async (userId) => {
    set({ isLoading: true, error: null});
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`)
      set({ messages: response.data })
    } catch (error: any) {
      console.log(error)
      set({ error: error.response.data.message})
    } finally {
      set({ isLoading: false })
    }
  }

})) 
  