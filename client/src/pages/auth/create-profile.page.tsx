import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import CreateProfileForm from '@/components/users/form/create';
import { APP_NAME } from '@/constants/router.constants';

const CreateProfilePage = () => {
    return (
        <Card className="w-4/5 md:w-lg">
            <CardHeader>
                <title>{`${APP_NAME} - Create Profile`}</title>
                <CardTitle className="text-2xl">Create Profile</CardTitle>
                <CardDescription>
                    Enter your details below to create your profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateProfileForm />
            </CardContent>
        </Card>
    );
};

export default CreateProfilePage;
