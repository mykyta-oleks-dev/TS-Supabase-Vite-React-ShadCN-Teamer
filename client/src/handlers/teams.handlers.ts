import { createTeam, joinTeam } from '@/api/teams';
import queryClient from '@/config/query';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { codeData, teamCreateData } from '@/schemas/teams.schemas';

export const handleJoinTeam = async (data: codeData, userId?: string) => {
    if (!userId) return;

    try {
        await joinTeam(data.code);

        queryClient.invalidateQueries({
			queryKey: KEYS.USER_BY_ID(userId),
		});
    } catch (error) {
        handleError(error, true);
    }
};

export const handleCreateTeam = async (data: teamCreateData, userId?: string) => {
    if (!userId) return;

	try {
		const res = await createTeam(data);

		const team = res.data.team;

		queryClient.setQueryData(KEYS.USER_BY_ID(userId), (oldUser) => {
			if (!oldUser) return oldUser;

			return {
				...oldUser,
				team_id: team.id,
			};
		});
	}
	catch (error) {
		handleError(error, true);
	}
}
