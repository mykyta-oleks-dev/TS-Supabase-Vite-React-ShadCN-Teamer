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
import { Textarea } from '@/components/ui/textarea';
import { USERS_FIELDS } from '@/constants/fields.constants';
import { handleCreateProfile } from '@/handlers/users.handlers';
import useNotRegistered from '@/hooks/protection/useNotRegistered';
import {
    createProfileSchema,
    type createProfileData,
} from '@/schemas/users.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateProfilePage = () => {
    useNotRegistered();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<createProfileData>({
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            full_name: '',
            avatar: undefined,
            about: '',
        },
    });

    return (
        <Card className="w-4/5 md:w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Create Profile</CardTitle>
                <CardDescription>
                    Enter your details below to create your profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleCreateProfile)}>
                    <div className="flex flex-col gap-4">
                        <FieldBlock
                            key={USERS_FIELDS.FULL_NAME.NAME}
                            control={control}
                            name={USERS_FIELDS.FULL_NAME.NAME}
                            label={USERS_FIELDS.FULL_NAME.LABEL}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={
                                        field.value instanceof File
                                            ? undefined
                                            : field.value
                                    }
                                    id={USERS_FIELDS.FULL_NAME.NAME}
                                    placeholder={
                                        USERS_FIELDS.FULL_NAME.PLACEHOLDER
                                    }
                                />
                            )}
                        />
						
                        <FieldBlock
                            key={USERS_FIELDS.ABOUT.NAME}
                            control={control}
                            name={USERS_FIELDS.ABOUT.NAME}
                            label={USERS_FIELDS.ABOUT.LABEL}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    value={
                                        field.value instanceof File
                                            ? undefined
                                            : field.value
                                    }
                                    id={USERS_FIELDS.ABOUT.NAME}
                                    placeholder={
                                        USERS_FIELDS.ABOUT.PLACEHOLDER
                                    }
                                />
                            )}
                        />

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

export default CreateProfilePage;
