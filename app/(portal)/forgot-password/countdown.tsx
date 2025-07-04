'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (countdownStarted && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countdownStarted, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      router.push(pushTo);
    }
  }, [seconds]);

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
