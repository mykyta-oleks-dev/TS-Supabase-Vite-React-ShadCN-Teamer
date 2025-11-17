export const ROOMS = {
    ONLINE: {
        NAME: (teamId: string) => `online-${teamId}`,
        MAX_ASIDE: 3,
        MAX_HEADER: 10,
    },
} as const;
