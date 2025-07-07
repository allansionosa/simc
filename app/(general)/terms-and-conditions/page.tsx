import { getTermsPrivacy } from '@/components/hooks/useTermsPrivacy';
import { Metadata } from 'next';

export default async function TermsCondition() {
  const terms = await getTermsPrivacy();
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last updated:{' '}
        {(() => {
          try {
            return new Date(terms.termsLastModified).toLocaleDateString();
          } catch {
            // Fallback for browsers that don't support toLocaleDateString
            const date = new Date(terms.termsLastModified);
            return `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`;
          }
        })()}
      </p>
      <div
        className="prose prose-lg max-w-none tiptap-content mx-auto"
        dangerouslySetInnerHTML={{ __html: terms.termsAndConditions }}
      />
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Terms and Conditions | St. Irenaeus Medical Center Inc.',
  description:
    'Read the terms and conditions of St. Irenaeus Medical Center Inc. - our policies and guidelines for using our healthcare services.',
  keywords: [
    'terms and conditions',
    'policies',
    'St. Irenaeus Medical Center',
    'healthcare',
    'Philippines',
  ],
  openGraph: {
    title: 'Terms and Conditions | St. Irenaeus Medical Center Inc.',
    description:
      'Read the terms and conditions of St. Irenaeus Medical Center Inc. - our policies and guidelines for using our healthcare services.',
    url: 'https://your-domain.com/terms-and-conditions',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/simc_blue.png',
        width: 800,
        height: 600,
        alt: 'Terms and Conditions',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | St. Irenaeus Medical Center Inc.',
    description:
      'Read the terms and conditions of St. Irenaeus Medical Center Inc. - our policies and guidelines for using our healthcare services.',
    images: ['https://your-domain.com/simc_blue.png'],
  },
};
