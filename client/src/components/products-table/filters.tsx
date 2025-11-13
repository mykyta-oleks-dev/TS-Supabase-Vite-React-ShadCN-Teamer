import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    productsFiltersSchema,
    type productsFiltersData,
} from '@/schemas/products.schemas';
import type { GetProductQueryParams } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FieldBlock from '../field-block';
import { PRODUCTS_FILTER_FIELDS } from '@/constants/fields.constants';
import { Input } from '../ui/input';
import SubmitButton from '../submit-button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { statuses } from '@/types/models/product.types';
import { Button } from '../ui/button';
import useUsers from '@/hooks/query/user/useUsers';
import { handleError } from '@/lib/utils';
import PagesLoader from '../pages-loader';

interface ProductsFiltersProps {
    params: GetProductQueryParams;
    onFiltersSave: (values: productsFiltersData) => void;
}

const ProductsFilters = ({
    params,
    onFiltersSave: handleFiltersSave,
}: ProductsFiltersProps) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<productsFiltersData>({
        resolver: zodResolver(productsFiltersSchema),
        defaultValues: {
            text: params.text ?? '',
            status: undefined,
        },
    });

    const { data: users, isLoading, error } = useUsers();

    if (error) handleError(error, true);

    return (
        <Accordion
            type="single"
            collapsible
            className="mb-3 border-2 rounded-xl"
        >
            <AccordionItem value="filters">
                <AccordionTrigger className="border-b text-md px-4 rounded-b-none cursor-pointer">
                    Filters
                </AccordionTrigger>
                <AccordionContent className="p-2">
                    <form
                        onSubmit={handleSubmit(handleFiltersSave)}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-3"
                    >
                        <FieldBlock
                            className="col-span-full"
                            control={control}
                            name={PRODUCTS_FILTER_FIELDS.TEXT.NAME}
                            label={PRODUCTS_FILTER_FIELDS.TEXT.LABEL}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id={PRODUCTS_FILTER_FIELDS.TEXT.NAME}
                                    placeholder={
                                        PRODUCTS_FILTER_FIELDS.TEXT.PLACEHOLDER
                                    }
                                />
                            )}
                        />

                        <FieldBlock
                            control={control}
                            name={PRODUCTS_FILTER_FIELDS.STATUS.NAME}
                            label={PRODUCTS_FILTER_FIELDS.STATUS.LABEL}
                            render={({ field, fieldState }) => (
                                <Select
                                    name={field.name}
                                    value={field.value ? field.value : 'all'}
                                    onValueChange={(value) =>
                                        field.onChange(
                                            value === 'all' ? undefined : value
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        id={PRODUCTS_FILTER_FIELDS.STATUS.NAME}
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue
                                            placeholder={
                                                PRODUCTS_FILTER_FIELDS.STATUS
                                                    .PLACEHOLDER
                                            }
                                            className="capitalize"
                                        />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All</SelectItem>
                                        {statuses.map((s) => (
                                            <SelectItem key={s} value={s}>
                                                {s[0].toUpperCase() + s.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <FieldBlock
                            control={control}
                            name={PRODUCTS_FILTER_FIELDS.USER.NAME}
                            label={PRODUCTS_FILTER_FIELDS.USER.LABEL}
                            render={({ field, fieldState }) => (
                                <Select
                                    name={field.name}
                                    value={field.value ? field.value : 'all'}
                                    onValueChange={(value) =>
                                        field.onChange(
                                            value === 'all' ? undefined : value
                                        )
                                    }
                                >
                                    <SelectTrigger
                                        id={PRODUCTS_FILTER_FIELDS.USER.NAME}
                                        aria-invalid={fieldState.invalid}
                                        className='relative'
                                    >
                                        {isLoading && <PagesLoader />}
                                        <SelectValue
                                            placeholder={
                                                PRODUCTS_FILTER_FIELDS.USER
                                                    .PLACEHOLDER
                                            }
                                            className="capitalize"
                                        />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All</SelectItem>
                                        {users?.map((u) => (
                                            <SelectItem key={u.id} value={u.id}>
                                                {u.full_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <div className="col-span-full flex gap-3">
                            <SubmitButton
                                className="flex-1"
                                isSubmitting={isSubmitting}
                            >
                                Filter
                            </SubmitButton>
                            <Button
                                className="flex-1"
                                type="reset"
                                variant="outline"
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProductsFilters;
