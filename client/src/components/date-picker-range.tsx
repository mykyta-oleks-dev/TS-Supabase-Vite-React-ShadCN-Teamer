'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import type { DateRange } from 'react-day-picker';

interface DatePickerProps {
    id: string;
    value: DateRange | undefined;
    onChange: (value: DateRange | undefined) => void;
    placeholder: string;
}

const DatePickerRange = ({ id, value, onChange, placeholder }: DatePickerProps) => {
    const [open, setOpen] = React.useState(false);

    const from = value?.from || new Date();
    const to = value?.to || new Date();

    const valuesLable = `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`;

    return (
        <Popover open={open} onOpenChange={() => setOpen(prev => !prev)}>
            <PopoverTrigger id={id} asChild>
                <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                >
                    {value?.from || value?.to ? valuesLable : placeholder}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
            >
                <Calendar
                    mode="range"
                    numberOfMonths={2}
                    selected={value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        onChange(date);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePickerRange;
