import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { PRODUCTS_FILTER_FIELDS } from '@/constants/fields.constants';
import useUsers from '@/hooks/query/user/useUsers';
import { handleError } from '@/lib/utils';
import {
    DATE_FIELDS,
    productsFiltersSchema,
    type productsFiltersData,
} from '@/schemas/products.schemas';
import type { GetProductQueryParams } from '@/types/api';
import { statuses } from '@/types/models/product.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { isDateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import DatePickerRange from '../../date-picker-range';
import FieldBlock from '../../field-block';
import SubmitButton from '../../submit-button';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import SelectBlock from '../../ui/select-block';

interface ProductsFiltersProps {
    params: GetProductQueryParams;
    onFiltersSave: (values: productsFiltersData) => void;
}

const { TEXT, STATUS, USER, DATES, DATE } = PRODUCTS_FILTER_FIELDS;

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
            status: params.status,
            user_id: params.user_id,
            dates: {
                from: params.dateFrom,
                to: params.dateTo,
            },
            date: 'created_at',
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
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-3"
                    >
                        <FieldBlock
                            className="col-span-full"
                            control={control}
                            name={TEXT.NAME}
                            label={TEXT.LABEL}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    value={
                                        typeof field.value === 'string'
                                            ? field.value
                                            : ''
                                    }
                                    id={TEXT.NAME}
                                    placeholder={TEXT.PLACEHOLDER}
                                />
                            )}
                        />

                        <FieldBlock
                            control={control}
                            name={STATUS.NAME}
                            label={STATUS.LABEL}
                            render={({ field, fieldState }) => (
                                <SelectBlock
                                    withAll
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    id={STATUS.NAME}
                                    isInvalid={fieldState.invalid}
                                    placeholder={STATUS.PLACEHOLDER}
                                    options={statuses?.map((s) => ({
                                        label: s[0].toUpperCase() + s.slice(1),
                                        value: s,
                                    }))}
                                />
                            )}
                        />

                        <FieldBlock
                            control={control}
                            name={USER.NAME}
                            label={USER.LABEL}
                            render={({ field, fieldState }) => (
                                <SelectBlock
                                    withAll
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    id={USER.NAME}
                                    isInvalid={fieldState.invalid}
                                    isLoading={isLoading}
                                    placeholder={USER.PLACEHOLDER}
                                    options={users?.map((u) => ({
                                        label: u.full_name,
                                        value: u.id,
                                    }))}
                                />
                            )}
                        />

                        <FieldBlock
                            control={control}
                            name={DATES.NAME}
                            label={DATES.LABEL}
                            render={({ field }) => (
                                <DatePickerRange
                                    id={DATES.NAME}
                                    value={
                                        isDateRange(field.value)
                                            ? field.value
                                            : undefined
                                    }
                                    onChange={field.onChange}
                                    placeholder={DATES.PLACEHOLDER}
                                />
                            )}
                        />

                        <FieldBlock
                            control={control}
                            name={DATE.NAME}
                            label={DATE.LABEL}
                            render={({ field, fieldState }) => (
                                <SelectBlock
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    id={DATE.NAME}
                                    isInvalid={fieldState.invalid}
                                    isLoading={isLoading}
                                    placeholder={DATE.PLACEHOLDER}
                                    options={DATE_FIELDS.map((d) => d)}
                                />
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
