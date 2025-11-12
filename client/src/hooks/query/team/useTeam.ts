import { getOwnTeam } from '@/api/teams';
import { KEYS } from '@/constants/query.constants';
import { mapTeamFromAPI, type Team } from '@/types/models/team.types';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../user/useCurrentUser';
import { isWithArray } from '@/types/api';
import { mapUserFromAPI, type User } from '@/types/models/user.types';

const useTeam = (deep?: boolean) => {
    const {
        query: { data },
    } = useCurrentUser();

    const id = data?.team_id;

    return useQuery({
        queryKey: [...KEYS.TEAM_BY_ID(id), { deep }],
        queryFn: async (): Promise<
            | {
                  team: Team;
                  users: User[];
                  products: number;
                  usersIsArray: true;
              }
            | {
                  team: Team;
                  users: number;
                  products: number;
                  usersIsArray: false;
              }
            | null
        > => {
            if (!id) return null;

            const res = await getOwnTeam(deep);

            const teamApi = res.data.team;

            const team = mapTeamFromAPI(teamApi);

            if (isWithArray(res.data)) {
                return {
                    team,
                    users: res.data.users.map((u) => mapUserFromAPI(u)),
                    products: res.data.products,
                    usersIsArray: true,
                };
            }

            return {
                team,
                users: res.data.users as number,
                products: res.data.products,
                usersIsArray: false,
            };
        },
        enabled: !!id,
    });
};

export default useTeam;
