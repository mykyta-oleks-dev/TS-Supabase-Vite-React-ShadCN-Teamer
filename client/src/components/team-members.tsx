import type { User } from '@/types/models/user.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/router.constants';

interface TeamMembersProps {
    users: User[];
}

const TeamMembers = ({ users }: TeamMembersProps) => {
    return (
        <ul className="p-2 w-full border rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {users.map((u) => (
                <li key={u.id}>
                    <Link
                        to={ROUTES.PROFILES.ONE(u.id)}
                        className="p-2 flex gap-3 items-center hover:underline"
                    >
                        <Avatar>
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
