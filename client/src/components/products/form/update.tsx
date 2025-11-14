import FieldBlock from '@/components/field-block';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PRODUCTS_FORM_FIELDS } from '@/constants/fields.constants';
import { getAcceptedImageTypesStr } from '@/constants/validation.constants';
import {
    editProductSchema,
    type editProductData,
} from '@/schemas/products.schemas';
import type { Product } from '@/types/models/product.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const { IMAGE, TITLE, DESCRIPTION } = PRODUCTS_FORM_FIELDS;

const ProductUpdateForm = ({
    onSubmit: handleCreate,
    product,
}: {
    onSubmit: (data: editProductData) => void;
    product: Product;
}) => {
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<editProductData>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            title: product.title,
            description: product.description,
            image: undefined,
        },
    });

    return (
        <form
            onSubmit={handleSubmit(handleCreate)}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-3"
        >
            <div className="flex flex-col gap-3">
                <img
                    src={imagePreview ?? product.image}
                    alt="Product's image preview"
                />

                <FieldBlock
                    control={control}
                    name={IMAGE.NAME}
                    label={IMAGE.LABEL}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="file"
                            value={undefined}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                field.onChange(file);

                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagePreview(
                                            reader.result as string
                                        );
                                    };
                                    reader.readAsDataURL(file);
                                } else {
                                    setImagePreview(null);
                                }
                            }}
                            accept={getAcceptedImageTypesStr()}
                        />
                    )}
                />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-3">
                <FieldBlock
                    control={control}
                    name={TITLE.NAME}
                    label={TITLE.LABEL}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={
                                typeof field.value === 'string'
                                    ? field.value
                                    : undefined
                            }
                            placeholder={TITLE.PLACEHOLDER}
                        />
                    )}
                />

                <FieldBlock
                    className="sm:flex-1"
                    control={control}
                    name={DESCRIPTION.NAME}
                    label={DESCRIPTION.LABEL}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            className="min-h-32 flex-1 sm:min-h-16"
                            value={
                                typeof field.value === 'string'
                                    ? field.value
                                    : undefined
                            }
                            placeholder={DESCRIPTION.PLACEHOLDER}
                        />
                    )}
                />
            </div>

            <div className="col-span-full flex flex-col md:flex-row gap-3">
                <Button
                    className="flex-1"
                    onClick={() => navigate(-1)}
                    variant="secondary"
                >
                    Cancel
                </Button>

                <SubmitButton className="flex-1" isSubmitting={isSubmitting}>
                    Update
                </SubmitButton>

                <Button
                    className="flex-1"
                    type="reset"
                    variant="outline"
                    onClick={() => {
                        reset();
                        setImagePreview(null);
                    }}
                >
                    Reset
                </Button>
            </div>
        </form>
    );
};

export default ProductUpdateForm;
