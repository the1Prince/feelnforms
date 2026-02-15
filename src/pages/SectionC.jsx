import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { SectionLayout } from '../components/SectionLayout';
import { validateSectionC } from '../utils/validation';

const TOOLS = [
  'Social Media (Facebook, Instagram, TikTok)',
  'Online Booking Platforms',
  'Google Business Profile',
  'Email Marketing',
  'Website / Blog',
  'Online Payment Systems',
  'None',
];

const SKILLS_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

function toggleArray(arr, item) {
  if (arr.includes(item)) return arr.filter((x) => x !== item);
  return [...arr, item];
}

export function SectionC() {
  const { form, setField } = useForm();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = validateSectionC(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <SectionLayout title="Section C: Digital & Skills Readiness" validate={validate}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Current Level of Digital Skills</label>
        <div className="flex flex-wrap gap-4">
          {SKILLS_LEVELS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="digitalSkills"
                checked={form.digitalSkillsLevel === opt}
                onChange={() => setField('digitalSkillsLevel', opt)}
                className="text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Which tools do you currently use? (Select all that apply) *</label>
        <div className="space-y-2">
          {TOOLS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.toolsUsed?.includes(opt) ?? false}
                onChange={() => setField('toolsUsed', toggleArray(form.toolsUsed ?? [], opt))}
                className="rounded text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {errors.toolsUsed && <p className="mt-1 text-sm text-red-600">{errors.toolsUsed}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Biggest Challenges You Face in Tourism Operations
        </label>
        <p className="text-sm text-slate-500 mb-1">e.g. marketing, customer retention, low bookings, digital skills, service quality, seasonality</p>
        <textarea
          value={form.biggestChallenges}
          onChange={(e) => setField('biggestChallenges', e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
          placeholder="Describe your main challenges..."
        />
      </div>
    </SectionLayout>
  );
}
