'use client';

import { resetPassword } from '@/app/api';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import ResetPasswordForm, { resetPasswordSchema } from '../resetPasswordForm';
import CountDown from '../countdown';
import { z } from 'zod';

type ResetPassword = z.infer<typeof resetPasswordSchema>;

type DoctorForgotPasswordProps = {
  token: string;
};

export function DoctorForgotPasswordClient({
  token,
}: DoctorForgotPasswordProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const handleSubmit = async (
    values: ResetPassword,
    form: UseFormReturn<ResetPassword>
  ) => {
    try {
      setIsLoading(true);

      await resetPassword(token, values.password, 'doctor');
      toast('Password Successfully Changed.');
      form.reset();
      setCountdownStarted(true);
    } catch (err: unknown) {
      console.log('Password reset error:', err);
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        toast(
          (err as { response?: { data?: string } }).response?.data ||
            'Something went wrong please try again later.'
        );
      } else {
        toast('Something went wrong please try again later.');
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ResetPasswordForm onSubmit={handleSubmit} loading={isLoading} />
      <CountDown
        countdownStarted={countdownStarted}
        pushTo="/portal/doctor/login"
        title="Doctor Portal"
      />
    </div>
  );
}
