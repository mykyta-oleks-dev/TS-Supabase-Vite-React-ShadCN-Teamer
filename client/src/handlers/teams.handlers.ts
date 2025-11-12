import { createTeam, joinTeam } from '@/api/teams';
import queryClient from '@/config/query';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { codeData, teamCreateData } from '@/schemas/teams.schemas';
import type { Team } from '@/types/models/team.types';
import { toast } from 'sonner';

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

export const handleCreateTeam = async (
    data: teamCreateData,
    userId?: string
) => {
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
    } catch (error) {
        handleError(error, true);
    }
};

export const handleCopyCode = (team: Team) => {
    navigator.clipboard.writeText(team.code);

    toast.success("Team's code is copied!");
};
