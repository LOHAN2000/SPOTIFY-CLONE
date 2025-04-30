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
  userActivities: Map<string, string>;
  messages: Message[];

  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnetSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
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
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],

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
      socket.connect();
      socket.emit('user_connected', userId)
    }
  },

  disconnetSocket: () => {

  },

  sendMessage: (receiverId, senderId, content) => {

  }

})) 
  