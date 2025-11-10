import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { TEAMS_FIELDS } from '@/constants/fields.constants';
import { handleJoinTeam } from '@/handlers/teams.handlers';
import { codeSchema, type codeData } from '@/schemas/teams.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Session } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';

const JoinTeam = ({ session }: { session: Session | null }) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<codeData>({
        resolver: zodResolver(codeSchema),
        defaultValues: {
            code: '',
        },
    });

    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleJoinTeam(data, session?.user.id)
            )}
        >
            <div className="flex flex-col gap-4">
                <FieldBlock
                    control={control}
                    name={TEAMS_FIELDS.CODE.NAME}
                    label={TEAMS_FIELDS.CODE.LABEL}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={TEAMS_FIELDS.CODE.NAME}
                            placeholder={TEAMS_FIELDS.CODE.PLACEHOLDER}
                        />
                    )}
                />

                <SubmitButton className="flex-1" isSubmitting={isSubmitting}>
                    Join
                </SubmitButton>
            </div>
        </form>
    );
};

export default JoinTeam;
