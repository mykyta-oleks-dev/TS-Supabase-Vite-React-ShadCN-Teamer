import type { ReactNode } from 'react';
import PagesLoader from '../pages-loader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface SelectBlockProps {
    id: string;
    name: string;
    value: unknown | undefined;
    onChange: (value: unknown | undefined) => void;
    placeholder: string;
    isInvalid: boolean | undefined;
    isLoading?: boolean;
    options:
        | {
              value: string;
              label: ReactNode;
          }[]
        | undefined
        | null;
}

const SelectBlock = ({
    name,
    value,
    onChange,
    id,
    isInvalid,
    isLoading,
    placeholder,
    options,
}: SelectBlockProps) => {
    return (
        <Select
            name={name}
            value={typeof value === 'string' ? value : 'all'}
            onValueChange={(value) =>
                onChange(value === 'all' ? undefined : value)
            }
        >
            <SelectTrigger
                id={id}
                aria-invalid={isInvalid}
                className="relative"
            >
                {isLoading && <PagesLoader />}
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectItem value="all">All</SelectItem>
                {options?.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                        {o.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectBlock;
