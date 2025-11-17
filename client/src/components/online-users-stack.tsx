import AvatarStack from '@/components/avatar-stack';
import useOnlineUsers from '@/store/onlineUsers';
import { useMemo } from 'react';

export const OnlineUsersStack = ({
    maxAvatarsAmount,
}: {
    maxAvatarsAmount?: number;
}) => {
    const usersMap = useOnlineUsers((s) => s.usersMap);
    const avatars = useMemo(() => {
        return Object.values(usersMap).map((user) => ({
            name: user.name,
            image: user.image,
        }));
    }, [usersMap]);

    return (
        <AvatarStack avatars={avatars} maxAvatarsAmount={maxAvatarsAmount} />
    );
};
