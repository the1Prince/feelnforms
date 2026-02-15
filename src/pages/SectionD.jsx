import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { SectionLayout } from '../components/SectionLayout';
import { validateSectionD } from '../utils/validation';

const TRAINING_AREAS = [
  'Digital Marketing for Tourism',
  'Tourism Customer Experience & Service Excellence',
  'Storytelling & Branding for Destinations',
  'Sustainable & Responsible Tourism',
  'AI & Technology in Tourism',
  'Data & Analytics for Tourism Businesses',
  'Revenue Management & Pricing',
  'Content Creation (Photos, Video, Reels)',
  'Online Reviews & Reputation Management',
  'Tourism Product Development',
];

const FORMATS = [
  'Physical workshops',
  'Online live sessions',
  'Hybrid (Physical + Online)',
  'Self-paced materials',
];

const MAX_INTERESTS = 5;

function toggleInterest(arr, item) {
  if (arr.includes(item)) return arr.filter((x) => x !== item);
  if (arr.length >= MAX_INTERESTS) return arr;
  return [...arr, item];
}

export function SectionD() {
  const { form, setField } = useForm();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = validateSectionD(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const count = form.trainingInterests?.length ?? 0;

  return (
    <SectionLayout title="Section D: Training Expectations & Interests" validate={validate}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">What do you hope to gain from this training?</label>
        <textarea
          value={form.hopeToGain}
          onChange={(e) => setField('hopeToGain', e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
          placeholder="Your expectations..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Which training areas interest you most? (Select up to 5) *
        </label>
        <p className="text-sm text-slate-500 mb-2">Selected: {count} / {MAX_INTERESTS}</p>
        <div className="space-y-2">
          {TRAINING_AREAS.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-2 cursor-pointer ${count >= MAX_INTERESTS && !form.trainingInterests?.includes(opt) ? 'opacity-60' : ''}`}
            >
              <input
                type="checkbox"
                checked={form.trainingInterests?.includes(opt) ?? false}
                onChange={() => setField('trainingInterests', toggleInterest(form.trainingInterests ?? [], opt))}
                disabled={count >= MAX_INTERESTS && !form.trainingInterests?.includes(opt)}
                className="rounded text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {errors.trainingInterests && <p className="mt-1 text-sm text-red-600">{errors.trainingInterests}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Learning Format</label>
        <div className="space-y-2">
          {FORMATS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={form.preferredFormat === opt}
                onChange={() => setField('preferredFormat', opt)}
                className="text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </SectionLayout>
  );
}
