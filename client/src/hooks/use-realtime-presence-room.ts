'use client';

import { REALTIME_SUBSCRIBE_STATES } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import useCurrentUser from './query/user/useCurrentUser';
import { handleError } from '@/lib/utils';
import getSupabase from '@/config/supabase';

const supabase = getSupabase();

export type RealtimeUser = {
    id: string;
    name: string;
    image: string;
};

export const useRealtimePresenceRoom = (roomName: string) => {
    const {
        query: { data: user, error },
    } = useCurrentUser();

    if (error) handleError(error, true);

    const [users, setUsers] = useState<Record<string, RealtimeUser>>({});

    useEffect(() => {
        const room = supabase.channel(roomName);

        room.on('presence', { event: 'sync' }, () => {
            const newState = room.presenceState<{
                image: string;
                name: string;
            }>();

            const newUsers = Object.fromEntries(
                Object.entries(newState).map(([key, values]) => [
                    key,
                    { name: values[0].name, image: values[0].image },
                ])
            ) as Record<string, RealtimeUser>;
            setUsers(newUsers);
        }).subscribe(async (status) => {
            if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED && user) {
                await room.track({
                    name: user.full_name,
                    image: user.avatar,
                });
            } else {
                setUsers({});
            }
        });

        return () => {
            room.unsubscribe();
        };
    }, [roomName, user]);

    return { users };
};
