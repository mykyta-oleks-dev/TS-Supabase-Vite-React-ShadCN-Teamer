import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { TEAMS_FIELDS } from '@/constants/fields.constants';
import { handleCreateTeam } from '@/handlers/teams.handlers';
import { teamCreateSchema, type teamCreateData } from '@/schemas/teams.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Session } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';

const CreateTeam = ({ session }: { session: Session | null }) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<teamCreateData>({
        resolver: zodResolver(teamCreateSchema),
        defaultValues: {
            name: '',
        },
    });

    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleCreateTeam(data, session?.user.id)
            )}
        >
            <div className="flex flex-col gap-4">
                <FieldBlock
                    control={control}
                    name={TEAMS_FIELDS.NAME.NAME}
                    label={TEAMS_FIELDS.NAME.LABEL}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={TEAMS_FIELDS.NAME.NAME}
                            placeholder={TEAMS_FIELDS.NAME.PLACEHOLDER}
                        />
                    )}
                />

                <SubmitButton className="flex-1" isSubmitting={isSubmitting}>
                    Create
                </SubmitButton>
            </div>
        </form>
    );
};

export default CreateTeam;
