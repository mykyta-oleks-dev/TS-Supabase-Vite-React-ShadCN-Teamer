import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
    session: Session | null;
	hasProfile: boolean;
    isLoadingAuth: boolean;
    errorAuth: string | null;

    reset: () => void;
    setSession: (session: Session | null) => void;
    setHasProfile: (hasProfile: boolean) => void;
    setIsLoadingAuth: (isLoading: boolean) => void;
    setErrorAuth: (error: string | null) => void;
}

const useAuth = create<AuthStore>((set) => ({
    session: null,
	hasProfile: false,
    isLoadingAuth: true,
    errorAuth: null,

    reset: () =>
        set({
            session: null,
			hasProfile: false,
            isLoadingAuth: false,
            errorAuth: null,
        }),
    setSession: (session) => set({ session }),
	setHasProfile: (hasProfile) => set({ hasProfile }),
    setIsLoadingAuth: (isLoading) => set({ isLoadingAuth: isLoading }),
    setErrorAuth: (error) => set({ errorAuth: error }),
}));

export default useAuth;
