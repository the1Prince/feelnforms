import { Link, useLocation } from 'react-router-dom';

export function ThankYou() {
  const location = useLocation();
  const emailSent = location.state?.emailSent ?? true;

  return (
    <div className="min-h-screen py-16 px-4 flex flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Thank you</h1>
        <p className="text-slate-600 mb-4">
          Your registration has been submitted successfully.
        </p>
        {emailSent && (
          <p className="text-sm text-slate-500 mb-8">
            A confirmation email has been sent to your email address.
          </p>
        )}
        <Link
          to="/section-a"
          className="inline-block rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
        >
          Submit another response
        </Link>
      </div>
    </div>
  );
}
