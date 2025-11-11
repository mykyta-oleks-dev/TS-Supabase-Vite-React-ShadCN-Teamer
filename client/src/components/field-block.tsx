import {
    Controller,
    type ControllerProps,
    type FieldValues,
} from 'react-hook-form';
import { Field, FieldDescription, FieldError, FieldLabel } from './ui/field';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface FieldBlockProps<TFieldValues extends FieldValues>
    extends Omit<ControllerProps<TFieldValues>, 'render'> {
    label?: string;
    description?: string | ReactNode;
    render: ControllerProps<TFieldValues>['render'];
    className?: string;
}

const FieldBlock = <TFieldValues extends FieldValues>({
    label,
    description,
    render,
    className,
    ...props
}: FieldBlockProps<TFieldValues>) => {
    return (
        <Controller
            {...props}
            render={({ field, fieldState, formState }) => (
                <Field
                    data-invalid={fieldState.invalid}
                    className={cn('gap-2', className)}
                >
                    {label && (
                        <FieldLabel htmlFor={props.name}>{label}</FieldLabel>
                    )}
                    {render({ field, fieldState, formState })}
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
};

export default FieldBlock;
