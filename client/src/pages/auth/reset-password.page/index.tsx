import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import useAuth from '@/store/auth';
import SendEmail from './send-email';
import NewPassword from './new-password';

const ResetPassword = () => {
    const session = useAuth((s) => s.session);

    return (
        <Card className="w-4/5 md:w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Reset your password</CardTitle>
                <CardDescription>
                    {session
                        ? 'Please insert a new password'
                        : 'We will send an email to you with the link to change your password'}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {!session && <SendEmail />}
                {session && <NewPassword />}
            </CardContent>
        </Card>
    );
};

export default ResetPassword;
