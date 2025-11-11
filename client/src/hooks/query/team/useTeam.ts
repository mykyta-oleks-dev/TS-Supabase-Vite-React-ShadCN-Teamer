import { getOwnTeam } from '@/api/teams';
import { KEYS } from '@/constants/query.constants';
import { mapTeamFromAPI } from '@/types/models/team.types';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../user/useCurrentUser';
import { isWithArray, isWithCount } from '@/types/api';
import { mapUserFromAPI } from '@/types/models/user.types';

const useTeam = () => {
    const {
        query: { data },
    } = useCurrentUser();

    const id = data?.team_id;

    return useQuery({
        queryKey: KEYS.TEAM_BY_ID(id),
        queryFn: async () => {
            if (!id) return null;

            const res = await getOwnTeam();

            const teamApi = res.data.team;

            const team = mapTeamFromAPI(teamApi);

            if (isWithCount(res.data)) return { team, users: res.data.users };

            if (isWithArray(res.data)) {
                return {
                    team,
                    users: res.data.users.map((u) => mapUserFromAPI(u)),
                };
            }

            return { team };
        },
        enabled: !!id,
    });
};

export default useTeam;
