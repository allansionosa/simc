'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface CountdownProps {
  countdownStarted: boolean;
  pushTo: string;
  title?: string;
}

export default function CountDown({
  countdownStarted,
  pushTo,
  title,
}: CountdownProps) {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (countdownStarted && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            // Clear interval when reaching 0
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdownStarted]);

  useEffect(() => {
    if (seconds === 0) {
      router.push(pushTo);
    }
  }, [seconds, router, pushTo]);

  return countdownStarted ? (
    <div className="absolute z-10 top-40 right-1/2 translate-x-1/2">
      <Badge>
        <Loader2 className={cn('h-4 w-4 animate-spin text-white')} />
        redirecting to&nbsp;{' '}
        <a href={pushTo} className="underline font-medium">
          {title}
        </a>{' '}
        &nbsp;in {seconds}
      </Badge>
    </div>
  ) : null;
}
