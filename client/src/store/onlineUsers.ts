import type { RealtimeUser } from '@/hooks/use-realtime-presence-room';
import { create } from 'zustand';

interface RealtimeOnlineUsersStore {
    usersMap: Record<string, RealtimeUser>;

    setUsersMap: (usersMap: Record<string, RealtimeUser>) => void;
}

const useOnlineUsers = create<RealtimeOnlineUsersStore>((set) => ({
    usersMap: {},

    setUsersMap: (usersMap) => set({ usersMap }),
}));

export default useOnlineUsers;
