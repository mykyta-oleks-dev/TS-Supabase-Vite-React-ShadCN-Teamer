import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
	session: Session | null;
	isLoading: boolean;
	error: string | null;

	reset: () => void;
	setSession: (session: Session | null) => void;
	setIsLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
}

const useAuth = create<AuthStore>((set) => ({
	session: null,
	isLoading: false,
	error: null,

	reset: () =>
		set({
			session: null,
			isLoading: false,
			error: null,
		}),
	setSession: (session) => set({ session }),
	setIsLoading: (isLoading) => set({ isLoading }),
	setError: (error) => set({ error }),
}));

export default useAuth;
