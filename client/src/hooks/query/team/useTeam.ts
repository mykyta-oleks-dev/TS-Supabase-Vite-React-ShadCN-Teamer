import { getOwnTeam } from '@/api/teams';
import { KEYS } from '@/constants/query.constants';
import { mapTeamFromAPI } from '@/types/models/team.types';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../user/useCurrentUser';

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

            return team;
        },
        enabled: !!id,
    });
};

export default useTeam;
