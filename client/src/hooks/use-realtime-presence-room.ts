'use client';

import getSupabase from '@/config/supabase';
import useOnlineUsers from '@/store/onlineUsers';
import { REALTIME_SUBSCRIBE_STATES } from '@supabase/supabase-js';
import { useEffect } from 'react';
import type { User } from '@/types/models/user.types';

const supabase = getSupabase();

export type RealtimeUser = {
    id: string;
    name: string;
    image: string;
};

export const useRealtimePresenceRoom = (roomName: string | undefined, user: User | undefined) => {
    const { usersMap, setUsersMap } = useOnlineUsers();

    useEffect(() => {
        if (!roomName) return;
        
        const room = supabase.channel(roomName);

        room.on('presence', { event: 'sync' }, () => {
            const newState = room.presenceState<{
                id: string;
                image: string;
                name: string;
            }>();

            const newUsers = Object.fromEntries(
                Object.entries(newState).map(([key, values]) => [
                    key,
                    {
                        id: values[0].id,
                        name: values[0].name,
                        image: values[0].image,
                    },
                ])
            ) as Record<string, RealtimeUser>;

            setUsersMap(newUsers);
        }).subscribe(async (status) => {
            if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED && user) {
                await room.track({
                    id: user.id,
                    name: user.full_name,
                    image: user.avatar,
                });
            } else {
                setUsersMap({});
            }
        });

        return () => {
            room.unsubscribe();
        };
    }, [roomName, user, setUsersMap]);

    return { users: usersMap };
};
