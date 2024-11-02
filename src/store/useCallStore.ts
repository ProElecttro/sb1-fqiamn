import { create } from 'zustand';

interface CallStore {
  channelName: string;
  setChannelName: (name: string) => void;
  isAudioOnly: boolean;
  setIsAudioOnly: (isAudio: boolean) => void;
  users: string[];
  addUser: (uid: string) => void;
  removeUser: (uid: string) => void;
}

export const useCallStore = create<CallStore>((set) => ({
  channelName: '',
  setChannelName: (name) => set({ channelName: name }),
  isAudioOnly: false,
  setIsAudioOnly: (isAudio) => set({ isAudioOnly: isAudio }),
  users: [],
  addUser: (uid) => set((state) => ({ users: [...state.users, uid] })),
  removeUser: (uid) => set((state) => ({ users: state.users.filter((id) => id !== uid) })),
}));