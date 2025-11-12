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
import { handleLogin } from '@/handlers/auth.handlers';
import useRegistered from '@/hooks/protection/useRegistered';
import useHash from '@/hooks/useHash';
import { logInSchema, type logInData } from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const fields = [AUTH_FIELDS.EMAIL, AUTH_FIELDS.PASSWORD];

const LogInPage = () => {
    useRegistered();
    useHash();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<logInData>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Card className="w-4/5 md:w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your credentials below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col gap-4">
                        {fields.map((f) => (
                            <FieldBlock
                                key={f.NAME}
                                control={control}
                                name={f.NAME}
                                label={f.LABEL}
                                description={
                                    f.NAME === 'password' ? (
                                        <Link to={ROUTES.AUTH.RESET_PASSWORD}>
                                            Forgot your password?
                                        </Link>
                                    ) : undefined
                                }
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
                                Log In
                            </SubmitButton>
                            <Button
                                className="flex-1"
                                type="reset"
                                variant="outline"
                            >
                                Reset
                            </Button>
                        </div>
                        <hr />
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link to={ROUTES.AUTH.SIGN_UP}>Sign up</Link>
                        </div>
                        <GoogleAuthButton />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default LogInPage;
