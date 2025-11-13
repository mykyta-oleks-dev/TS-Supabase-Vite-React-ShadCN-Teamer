import type { ReactNode } from 'react';
import PagesLoader from '../pages-loader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';

type SelectBlockProps = {
    id: string;
    name: string;
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
} & (
    | {
          withAll: true;
          value: unknown | undefined;
          onChange: (value: unknown | undefined) => void;
      }
    | {
          withAll?: false;
          value: unknown;
          onChange: (value: unknown) => void;
      }
);

const SelectBlock = ({
    name,
    value,
    onChange,
    id,
    isInvalid,
    isLoading,
    placeholder,
    options,
    withAll,
}: SelectBlockProps) => {
    return (
        <Select
            name={name}
            value={typeof value === 'string' ? value : 'all'}
            onValueChange={(value) =>
                onChange(withAll && value === 'all' ? undefined : value)
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
                {withAll && <SelectItem value="all">All</SelectItem>}
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
