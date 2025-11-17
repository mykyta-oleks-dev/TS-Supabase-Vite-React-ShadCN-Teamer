import { ROUTES } from '@/constants/router.constants';
import useOnlineUsers from '@/store/onlineUsers';
import type { User } from '@/types/models/user.types';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface TeamMembersProps {
    users: User[];
}

const TeamMembers = ({ users }: TeamMembersProps) => {
    const usersMap = useOnlineUsers((s) => s.usersMap);

    const onlineIds = Object.values(usersMap).map((u) => u.id);

    return (
        <ul className="p-2 w-full border rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {users.map((u) => (
                <li key={u.id}>
                    <Link
                        to={ROUTES.PROFILES.ONE(u.id)}
                        className="p-2 flex gap-3 items-center hover:underline"
                    >
                        <Avatar
                            className={
                                `border-2 ${onlineIds.includes(u.id)
                                    ? 'border-green-500'
                                    : 'border-zinc-500'}`
                            }
                        >
                            <AvatarImage src={u.avatar} />
                            <AvatarFallback>
                                {u.full_name.at(0)?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <p>{u.full_name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default TeamMembers;
