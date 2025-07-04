import HMOApprovalForm from '@/components/hmo-approval/HmoApprovalForm';
import { Metadata } from 'next';

export default function HmoApprovalPage() {
  return <HMOApprovalForm />;
}

export const metadata: Metadata = {
  title: 'HMO Approval | St. Irenaeus Medical Center Inc.',
  description:
    'Submit your HMO approval request at St. Irenaeus Medical Center Inc. for fast and convenient processing.',
  keywords: [
    'HMO approval',
    'health maintenance organization',
    'insurance',
    'St. Irenaeus Medical Center',
    'healthcare',
    'Philippines',
  ],
  openGraph: {
    title: 'HMO Approval | St. Irenaeus Medical Center Inc.',
    description:
      'Submit your HMO approval request at St. Irenaeus Medical Center Inc. for fast and convenient processing.',
    url: 'https://your-domain.com/hmo-approval',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/hmobg.jpg',
        width: 800,
        height: 600,
        alt: 'HMO Approval',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMO Approval | St. Irenaeus Medical Center Inc.',
    description:
      'Submit your HMO approval request at St. Irenaeus Medical Center Inc. for fast and convenient processing.',
    images: ['https://your-domain.com/hmobg.jpg'],
  },
};
