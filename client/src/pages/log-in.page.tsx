import FieldBlock from '@/components/field-block';
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
import { FIELDS } from '@/constants/fields.constants';
import { handleLogin } from '@/handlers/auth.handlers';
import { logInSchema, type logInData } from '@/schemas/user.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const { USER } = FIELDS;

const fields = [USER.EMAIL, USER.PASSWORD];

const LogInPage = () => {
    const navigate = useNavigate();
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
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit((data) =>
                        handleLogin(data, navigate)
                    )}
                >
                    <div className="flex flex-col gap-6">
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
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default LogInPage;
