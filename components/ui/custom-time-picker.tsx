'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from './button';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

interface CustomTimePickerProps {
  selectedTime?: string;
  onSelect: (time: string) => void;
  label?: string;
  placeholder?: string;
  timeSlots?: string[];
  className?: string;
}

const defaultTimeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];

export function CustomTimePicker({
  selectedTime,
  onSelect,
  label,
  placeholder = 'Select a time',
  timeSlots = defaultTimeSlots,
  className,
}: CustomTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTimeSelect = (time: string) => {
    onSelect(time);
    setIsOpen(false);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedTime && 'text-black/50'
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {selectedTime || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'justify-start text-sm',
                    selectedTime === time &&
                      'bg-primary text-primary-foreground',
                    selectedTime !== time &&
                      'hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
