import { useForm } from '../context/FormContext';
import { SectionLayout } from '../components/SectionLayout';

const AVAILABILITY_OPTIONS = [
  'Weekdays (Morning)',
  'Weekdays (Evening)',
  'Weekends',
  'Flexible',
];

const ACCESS_OPTIONS = ['Yes', 'No', 'Limited access'];

function toggleArray(arr, item) {
  if (arr.includes(item)) return arr.filter((x) => x !== item);
  return [...arr, item];
}

export function SectionE() {
  const { form, setField } = useForm();

  return (
    <SectionLayout title="Section E: Logistics & Commitment">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Availability for Training Sessions</label>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.availability?.includes(opt) ?? false}
                onChange={() => setField('availability', toggleArray(form.availability ?? [], opt))}
                className="rounded text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Do you have access to a smartphone or computer with internet?
        </label>
        <div className="flex flex-wrap gap-4">
          {ACCESS_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deviceAccess"
                checked={form.deviceAccess === opt}
                onChange={() => setField('deviceAccess', opt)}
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
