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

interface DatePickerProps {
    id: string;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder: string;
}

const DatePicker = ({ id, value, onChange, placeholder }: DatePickerProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger id={id} asChild>
                <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                >
                    {value ? value.toLocaleDateString() : placeholder}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
            >
                <Calendar
                    mode="single"
                    selected={value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        onChange(date);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
