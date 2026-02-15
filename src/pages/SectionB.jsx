import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { SectionLayout } from '../components/SectionLayout';
import { validateSectionB } from '../utils/validation';

const PARTICIPANT_TYPES = [
  'Business Owner',
  'Manager / Supervisor',
  'Employee / Staff',
  'Freelancer / Consultant',
  'Student / Trainee',
  'Public Sector / Agency Staff',
];

const TOURISM_SUB_SECTORS = [
  'Accommodation (Hotel, Guesthouse, Hostel, Airbnb)',
  'Tour Operations / Travel Agency',
  'Cultural / Heritage Tourism',
  'Ecotourism / Nature-based Tourism',
  'Events & Festivals',
  'Food & Beverage (Restaurants, Cafés)',
  'Transport & Mobility',
  'Creative Arts & Entertainment',
  'Destination Marketing / Media',
  'Public Sector / Regulatory Body (e.g. Ghana Tourism Authority)',
  'Other (please specify)',
];

const YEARS_EXPERIENCE = [
  'Less than 1 year',
  '1–3 years',
  '4–7 years',
  '8–15 years',
  '15+ years',
];

function toggleArray(arr, item) {
  if (arr.includes(item)) return arr.filter((x) => x !== item);
  return [...arr, item];
}

export function SectionB() {
  const { form, setField } = useForm();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = validateSectionB(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const hasOther = form.tourismSubSector?.includes('Other (please specify)');

  return (
    <SectionLayout title="Section B: Organization / Business Details" validate={validate}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Type of Participant</label>
        <select
          value={form.participantType}
          onChange={(e) => setField('participantType', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
        >
          <option value="">Select</option>
          {PARTICIPANT_TYPES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Organization / Business Name</label>
        <input
          type="text"
          value={form.orgName}
          onChange={(e) => setField('orgName', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
          placeholder='Write "N/A" if not applicable'
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Tourism Sub-sector (Select all that apply) *</label>
        <div className="space-y-2">
          {TOURISM_SUB_SECTORS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.tourismSubSector?.includes(opt) ?? false}
                onChange={() => setField('tourismSubSector', toggleArray(form.tourismSubSector ?? [], opt))}
                className="rounded text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {errors.tourismSubSector && <p className="mt-1 text-sm text-red-600">{errors.tourismSubSector}</p>}
        {hasOther && (
          <input
            type="text"
            value={form.tourismSubSectorOther}
            onChange={(e) => setField('tourismSubSectorOther', e.target.value)}
            placeholder="Please specify"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience in Tourism</label>
        <select
          value={form.yearsExperience}
          onChange={(e) => setField('yearsExperience', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
        >
          <option value="">Select</option>
          {YEARS_EXPERIENCE.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </SectionLayout>
  );
}
