import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProgressIndicator } from './ProgressIndicator';

const SECTION_ORDER = [
  '/section-a', '/section-b', '/section-c', '/section-d', '/section-e', '/section-f',
];

export function SectionLayout({ title, children, validate, nextTo }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = SECTION_ORDER.indexOf(location.pathname);
  const prevPath = currentIndex > 0 ? SECTION_ORDER[currentIndex - 1] : null;
  const nextPath = nextTo ?? (currentIndex < SECTION_ORDER.length - 1 ? SECTION_ORDER[currentIndex + 1] : '/summary');

  const handleNext = () => {
    if (validate && !validate()) return;
    navigate(nextPath);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-2xl">
        <ProgressIndicator />
        <h1 className="text-2xl font-bold text-slate-800 mb-6">{title}</h1>
        <div className="space-y-6">{children}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          {prevPath && (
            <Link
              to={prevPath}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Back
            </Link>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
          >
            {nextPath === '/summary' ? 'Review & submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
