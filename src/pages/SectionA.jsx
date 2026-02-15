import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { SectionLayout } from '../components/SectionLayout';
import { validateSectionA } from '../utils/validation';
import { GHANA_REGIONS } from '../constants/ghanaRegions';

export function SectionA() {
  const { form, setField } = useForm();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = validateSectionA(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <SectionLayout title="Section A: Personal Information" validate={validate}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="Full name"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
        <div className="flex flex-wrap gap-4">
          {['Male', 'Female', 'Prefer not to say'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={form.gender === opt}
                onChange={() => setField('gender', opt)}
                className="text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Age Range</label>
        <select
          value={form.ageRange}
          onChange={(e) => setField('ageRange', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
        >
          <option value="">Select</option>
          <option value="Under 18">Under 18</option>
          <option value="18–24">18–24</option>
          <option value="25–34">25–34</option>
          <option value="35–44">35–44</option>
          <option value="45–54">45–54</option>
          <option value="55+">55+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (WhatsApp preferred) *</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setField('phone', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="Phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setField('email', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="Email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">City / Region of Operation *</label>
        <select
          value={form.cityRegion}
          onChange={(e) => setField('cityRegion', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-500 focus:outline-none"
        >
          <option value="">Select region</option>
          {GHANA_REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.cityRegion && <p className="mt-1 text-sm text-red-600">{errors.cityRegion}</p>}
      </div>
    </SectionLayout>
  );
}
