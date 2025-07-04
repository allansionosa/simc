import { getTermsPrivacy } from '@/components/hooks/useTermsPrivacy';

export default async function TermsCondition() {
  const terms = await getTermsPrivacy();
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Last updated: {new Date(terms.termsLastModified).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none tiptap-content mx-auto"
        dangerouslySetInnerHTML={{ __html: terms.termsAndConditions }}
      />
    </section>
  );
}
