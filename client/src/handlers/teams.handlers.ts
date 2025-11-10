import { joinTeam } from '@/api/teams';
import queryClient from '@/config/query';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { codeData } from '@/schemas/teams.schemas';

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
