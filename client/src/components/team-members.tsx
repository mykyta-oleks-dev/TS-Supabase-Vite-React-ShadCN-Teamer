import type { User } from '@/types/models/user.types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface TeamMembersProps {
    users: User[];
}

const TeamMembers = ({ users }: TeamMembersProps) => {
    return (
        <ul className="p-2 w-full border rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {users.map((u) => (
                <li className="p-2 flex gap-3 items-center" key={u.id}>
                    <Avatar>
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback>
                            {u.full_name.at(0)?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <p>{u.full_name}</p>
                </li>
            ))}
        </ul>
    );
};

export default TeamMembers;
