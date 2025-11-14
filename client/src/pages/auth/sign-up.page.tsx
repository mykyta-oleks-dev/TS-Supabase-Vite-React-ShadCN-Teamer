import FieldBlock from '@/components/field-block';
import GoogleAuthButton from '@/components/google-auth-button';
import Link from '@/components/link';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AUTH_FIELDS } from '@/constants/fields.constants';
import { ROUTES } from '@/constants/router.constants';
import { handleSignup } from '@/handlers/auth.handlers';
import useNotAuthed from '@/hooks/protection/auth/useNotAuthed';
import { signUpSchema, type signUpData } from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const fields = [
    AUTH_FIELDS.EMAIL,
    AUTH_FIELDS.PASSWORD,
    AUTH_FIELDS.CONFIRM_PASSWORD,
];

const SignUpPage = () => {
    useNotAuthed();

    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<signUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <Card className="w-4/5 md:w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your credentials below to create a new account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit((data) =>
                        handleSignup(data, navigate)
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
                                        type={f.TYPE ?? 'text'}
                                        id={f.NAME}
                                        placeholder={f.PLACEHOLDER}
                                    />
                                )}
                            />
                        ))}
                        <div className="flex sm:flex-row flex-col gap-3">
                            <SubmitButton
                                className="flex-1"
                                isSubmitting={isSubmitting}
                            >
                                Sign Up
                            </SubmitButton>
                            <Button
                                className="flex-1"
                                type="reset"
                                variant="outline"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                        </div>
                        <hr />
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <Link to={ROUTES.AUTH.LOG_IN}>Log in</Link>
                        </div>
                        <GoogleAuthButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default SignUpPage;
