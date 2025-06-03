import { create } from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    sidebarUsers: [],
    selectedUser: null,
    isUsersloading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersloading: true });
        try {
            const response = await axiosInstance.get('/messages/users');
            set({ users: response.data });
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users', error.response.data.message);
        }
        finally {
            set({ isUsersloading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data }); // Don't set selectedUser here!
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages', error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            toast.error('Failed to send message', error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, messages } = get();
        if (!selectedUser) {
            console.warn('No user selected for message subscription');
            return;
        }

        //todo:optimize this function later
        const socket = useAuthStore.getState().socket;


        socket.on("newMessage", (newMessage) => {
              if ( newMessage.senderId !== selectedUser._id) {
            console.warn('Received message from a different user, ignoring');
            return;
             }
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    
    setSelectedUser: (selectedUser) => set({ selectedUser}),

    getSidebarUsersWithLastMessages: async () => {
        set({ isUsersloading: true });
        try {
            const response = await axiosInstance.get('/messages/sidebar/last-messages');
            set({ sidebarUsers: response.data });
        } catch (error) {
            toast.error('Failed to load sidebar users');
        } finally {
            set({ isUsersloading: false });
        }
    },
}));