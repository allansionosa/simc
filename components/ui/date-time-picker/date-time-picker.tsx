'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { TimePicker } from './time-picker';

interface DateTimePickerProps {
  disabledDates?: Date[];
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  selectedDate?: Date;
  onSelect: SelectSingleEventHandler;
  setTime?: (date: Date | undefined) => void;
  label?: string;
  fromYear: number;
  toYear: number;
}

export function DateTimePicker({
  disabledDates = [],
  disablePastDates = false,
  selectedDate,
  onSelect,
  setTime,
  label = 'Pick a date',
  fromYear,
  toYear,
  disableFutureDates,
}: DateTimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedDate && ''
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            setTime ? (
              format(selectedDate, 'PPP p')
            ) : (
              format(selectedDate, 'PPP')
            )
          ) : (
            <span>
              {label}
              {setTime ? ' and time' : ''}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className=" w-auto p-0">
        <div className="flex flex-col items-center space-y-4 p-4">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={selectedDate}
            onSelect={onSelect}
            fromYear={fromYear}
            toYear={toYear}
            disabledDates={disabledDates}
            disablePastDates={disablePastDates}
            disableFutureDates={disableFutureDates}
            defaultMonth={selectedDate}
          />
          {setTime && <TimePicker date={selectedDate} setDate={setTime} />}
        </div>
      </PopoverContent>
    </Popover>
  );
}
