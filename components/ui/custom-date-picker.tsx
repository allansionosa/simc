'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';

interface CustomDatePickerProps {
  selectedDate?: Date;
  onSelect: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  disablePastDates?: boolean;
  className?: string;
}

export function CustomDatePicker({
  selectedDate,
  onSelect,
  label,
  placeholder = 'Select a date',
  disablePastDates = false,
  className,
}: CustomDatePickerProps) {
  // Ensure selectedDate is a valid Date object
  const validSelectedDate =
    selectedDate instanceof Date && !isNaN(selectedDate.getTime())
      ? selectedDate
      : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    return validSelectedDate || new Date();
  });

  const today = new Date();
  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());

  const days = [];

  // Generate calendar days
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < todayStart;
  };

  const isCurrentMonth = (date: Date) => {
    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleDateSelect = (date: Date) => {
    if (disablePastDates && isPastDate(date)) return;
    onSelect(date);
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    if (!disablePastDates) {
      onSelect(new Date());
    }
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
              !selectedDate && 'text-black/50'
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-sm font-semibold text-primary">
                {currentMonth.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="w-full text-xs"
              >
                Today
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="h-8 w-8 flex items-center justify-center text-xs font-medium text-primary"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-8 w-8 p-0 text-xs',
                    !isCurrentMonth(date) && 'text-black/50',
                    isToday(date) &&
                      'bg-accent text-accent-foreground font-bold',
                    isSelected(date) && 'bg-primary text-primary-foreground',
                    disablePastDates &&
                      isPastDate(date) &&
                      'text-black/30 cursor-not-allowed',
                    !disablePastDates &&
                      isPastDate(date) &&
                      'text-muted-foreground/50',
                    isCurrentMonth(date) &&
                      !isToday(date) &&
                      !isSelected(date) &&
                      !isPastDate(date) &&
                      'hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => handleDateSelect(date)}
                  disabled={disablePastDates && isPastDate(date)}
                >
                  {date.getDate()}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
