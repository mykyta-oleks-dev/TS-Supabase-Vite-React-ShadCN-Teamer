import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AUTH_FIELDS } from '@/constants/fields.constants';
import { ROUTES } from '@/constants/router.constants';
import { handleResetPassword } from '@/handlers/auth.handlers';
import {
    confirmPasswordSchema,
    type confirmPasswordData,
} from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const fields = [AUTH_FIELDS.PASSWORD, AUTH_FIELDS.CONFIRM_PASSWORD];

const NewPassword = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<confirmPasswordData>({
        resolver: zodResolver(confirmPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleResetPassword(data, navigate)
            )}
        >
            <div className="flex flex-col gap-4">
                {fields.map((f) => (
                    <FieldBlock
                        key={f.NAME}
                        control={control}
                        name={f.NAME}
                        label={f.LABEL}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type={f.TYPE}
                                id={f.NAME}
                                placeholder={f.PLACEHOLDER}
                            />
                        )}
                    />
                ))}

                <SubmitButton className="flex-1" isSubmitting={isSubmitting}>
                    Reset
                </SubmitButton>

                <Button asChild variant="secondary">
                    <Link to={ROUTES.ROOT}>Back to Home page</Link>
                </Button>
            </div>
        </form>
    );
};

export default NewPassword;
