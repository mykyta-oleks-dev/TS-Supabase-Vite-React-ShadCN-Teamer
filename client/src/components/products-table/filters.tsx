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
        },
    });

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
                        className="grid gap-3"
                    >
                        <FieldBlock
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
                        <SubmitButton isSubmitting={isSubmitting}>
                            Filter
                        </SubmitButton>
                    </form>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProductsFilters;
