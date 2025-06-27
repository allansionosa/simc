'use client';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-heading font-bold text-primary mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            We apologize, but the page you are looking for cannot be found. It
            may have been moved or is temporarily unavailable.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          Return to Home
        </Link>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Need immediate assistance?</p>
          <p className="mt-2">
            <a href="tel:+1234567890" className="text-primary hover:underline">
              Call Emergency: (123) 456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
