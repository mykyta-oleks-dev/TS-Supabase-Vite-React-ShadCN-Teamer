import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { USERS_FIELDS } from '@/constants/fields.constants';
import { handleCreateProfile } from '@/handlers/users.handlers';
import useNotRegistered from '@/hooks/protection/auth/useNotRegistered';
import {
    createProfileSchema,
    type createProfileData,
} from '@/schemas/users.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateProfileForm = () => {
    const { session } = useNotRegistered();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<createProfileData>({
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            full_name: '',
            avatar: undefined,
            about: '',
        },
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleCreateProfile(data, session?.user.id)
            )}
        >
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <Avatar className="size-16 md:size-20">
                        <AvatarImage
                            src={avatarPreview || '/default-avatar.png'}
                            alt="Avatar Preview"
                        />
                    </Avatar>

                    <FieldBlock
                        key={USERS_FIELDS.AVATAR.NAME}
                        control={control}
                        name={USERS_FIELDS.AVATAR.NAME}
                        label={USERS_FIELDS.AVATAR.LABEL}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="file"
                                value={
                                    field.value instanceof File
                                        ? undefined
                                        : field.value
                                }
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        field.onChange(file);

                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setAvatarPreview(
                                                reader.result as string
                                            );
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                id={USERS_FIELDS.AVATAR.NAME}
                                placeholder={USERS_FIELDS.AVATAR.PLACEHOLDER}
                            />
                        )}
                    />
                </div>

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
                            placeholder={USERS_FIELDS.FULL_NAME.PLACEHOLDER}
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
                            placeholder={USERS_FIELDS.ABOUT.PLACEHOLDER}
                        />
                    )}
                />

                <div className="flex sm:flex-row flex-col gap-3">
                    <SubmitButton
                        className="flex-1"
                        isSubmitting={isSubmitting}
                    >
                        Create Profile
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
            </div>
        </form>
    );
};

export default CreateProfileForm;
