'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';

import { Period } from '@/components/ui/date-time-picker/time-picker-utils';
import { TimePeriodSelect } from '@/components/ui/date-time-picker/period-select';
import { TimePickerInput } from './time-picker-input';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [period, setPeriod] = React.useState<Period>('PM');

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-col items-center">
        <Label htmlFor="hours" className="text-xs mb-1">
          Hours
        </Label>
        <TimePickerInput
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex flex-col items-center">
        <Label htmlFor="minutes" className="text-xs mb-1">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>
      <div className="flex flex-col items-center">
        <Label htmlFor="period" className="text-xs ">
          Period
        </Label>
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  );
}
