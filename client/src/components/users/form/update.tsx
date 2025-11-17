import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { USERS_FIELDS } from '@/constants/fields.constants';
import {
    updateProfileSchema,
    type updateProfileData,
} from '@/schemas/users.schemas';
import type { User } from '@/types/models/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const UpdateProfileForm = ({
    onSubmit,
    user,
}: {
    onSubmit: (data: updateProfileData) => Promise<void>;
    user: User;
}) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<updateProfileData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            full_name: user?.full_name ?? '',
            avatar: undefined,
            about: user?.about ?? '',
        },
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <Avatar className="size-32">
                        <AvatarImage
                            src={avatarPreview || user.avatar}
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

export default UpdateProfileForm;
