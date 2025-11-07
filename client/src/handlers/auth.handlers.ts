import getSupabase from '@/config/supabase';
import { handleError } from '@/lib/utils';

const handleLogout = async () => {
    const { error } = await getSupabase().auth.signOut();

    if (error) {
        handleError(error, true);
    }
};

export default handleLogout;
