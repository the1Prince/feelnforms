import { Link, useLocation } from 'react-router-dom';

const SECTIONS = [
  { path: '/section-a', label: 'A. Personal' },
  { path: '/section-b', label: 'B. Organization' },
  { path: '/section-c', label: 'C. Digital & Skills' },
  { path: '/section-d', label: 'D. Training' },
  { path: '/section-e', label: 'E. Logistics' },
  { path: '/section-f', label: 'F. Consent' },
];

export function ProgressIndicator() {
  const location = useLocation();
  const currentIndex = SECTIONS.findIndex((s) => location.pathname === s.path);

  return (
    <nav className="mb-8" aria-label="Form progress">
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {SECTIONS.map((section, i) => {
          const isActive = location.pathname === section.path;
          const isPast = currentIndex > i;
          return (
            <Link
              key={section.path}
              to={section.path}
              className={`
                rounded-lg px-2 py-1.5 text-sm font-medium transition
                ${isActive ? 'bg-amber-500 text-white' : ''}
                ${isPast ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : ''}
                ${!isActive && !isPast ? 'bg-slate-100 text-slate-500' : ''}
              `}
            >
              {section.label}
            </Link>
          );
        })}
      </div>
      {currentIndex >= 0 && (
        <p className="mt-2 text-sm text-slate-500">
          Section {currentIndex + 1} of {SECTIONS.length}
        </p>
      )}
    </nav>
  );
}
