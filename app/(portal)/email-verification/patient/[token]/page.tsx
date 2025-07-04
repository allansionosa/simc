'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { verifyPatient } from '@/app/api';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PatientEmailVerification({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing verification token.');
        return;
      }
      try {
        const response = await verifyPatient(token);

        setStatus('success');
        setMessage(response || 'Your email has been successfully verified!');
      } catch (err: unknown) {
        let errorMsg =
          'Verification failed. Please try again or contact support.';
        if (
          err &&
          typeof err === 'object' &&
          'response' in err &&
          err.response &&
          typeof err.response === 'object' &&
          'data' in err.response
        ) {
          errorMsg =
            (err as { response?: { data?: string } }).response?.data ||
            errorMsg;
        }
        setStatus('error');
        setMessage(errorMsg);
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-6">
        {status === 'loading' && (
          <>
            <Spinner className="h-8 w-8 mb-2" />
            <div className="text-lg font-semibold">Verifying your email...</div>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="h-12 w-12 text-green-600 mb-2" />
            <div className="text-xl font-bold text-green-700 mb-1">
              Email Verified!
            </div>
            <div className="text-gray-700 text-center">{message}</div>
            <Button
              className="mt-4 w-full"
              onClick={() => router.push('/portal/patient/login')}
            >
              Go to Login
            </Button>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="h-12 w-12 text-red-600 mb-2" />
            <div className="text-xl font-bold text-red-700 mb-1">
              Verification Failed
            </div>
            <div className="text-gray-700 text-center">{message}</div>
            <Button
              className="mt-4 w-full"
              onClick={() => router.push('/portal/patient/login')}
            >
              Go to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
