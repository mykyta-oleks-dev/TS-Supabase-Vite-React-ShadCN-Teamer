import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AUTH_FIELDS } from '@/constants/fields.constants';
import { ROUTES } from '@/constants/router.constants';
import { handleSendResetPassword } from '@/handlers/auth.handlers';
import { emailSchema, type emailData } from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const SendEmail = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<emailData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        },
    });

    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleSendResetPassword(data.email)
            )}
        >
            <div className="flex flex-col gap-4">
                <FieldBlock
                    control={control}
                    name={AUTH_FIELDS.EMAIL.NAME}
                    label={AUTH_FIELDS.EMAIL.LABEL}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={AUTH_FIELDS.EMAIL.NAME}
                            placeholder={AUTH_FIELDS.EMAIL.PLACEHOLDER}
                        />
                    )}
                />

                <SubmitButton className="flex-1" isSubmitting={isSubmitting}>
                    Send
                </SubmitButton>

                <Button asChild variant="secondary">
                    <Link to={ROUTES.AUTH.LOG_IN}>Back to Log In</Link>
                </Button>
            </div>
        </form>
    );
};

export default SendEmail;
