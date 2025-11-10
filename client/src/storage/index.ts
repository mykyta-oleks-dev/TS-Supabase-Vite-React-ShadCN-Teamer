import getSupabase from '@/config/supabase';

export const uploadFile = async (
    bucket: 'avatars' | 'products',
    file: File,
) => {
    const supabase = getSupabase();

    const fileName = `${Date.now()}-${file.name}`;

    const res = await supabase.storage.from(bucket).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
    });

    if (res.error) {
        throw res.error;
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return publicUrl;
};
