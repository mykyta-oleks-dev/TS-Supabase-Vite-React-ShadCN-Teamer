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

export const useRealtimePresenceRoom = (roomName: string, user: User | undefined) => {
    const { usersMap, setUsersMap } = useOnlineUsers();

    useEffect(() => {
        console.log({ roomName, user, setUsersMap });
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

            console.log('fired realtime');

            setUsersMap(newUsers);
        }).subscribe(async (status) => {
            if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED && user) {
                console.log('fired user subscription');
                await room.track({
                    id: user.id,
                    name: user.full_name,
                    image: user.avatar,
                });
            } else {
                console.log('fired user unsubscription');
                setUsersMap({});
            }
        });

        return () => {
            console.log('fired total unsubscription');
            room.unsubscribe();
        };
    }, [roomName, user, setUsersMap]);

    return { users: usersMap };
};
