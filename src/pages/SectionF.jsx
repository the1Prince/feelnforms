import { useState } from 'react';
import { useForm } from '../context/FormContext';
import { SectionLayout } from '../components/SectionLayout';
import { validateSectionF } from '../utils/validation';

const HOW_HEARD = ['Social Media', 'Industry Association', 'Recommendation', 'Email', 'Other'];

export function SectionF() {
  const { form, setField } = useForm();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = validateSectionF(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <SectionLayout title="Section F: Consent & Declaration" validate={validate} nextTo="/summary">
      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
        <p className="text-slate-700">
          I confirm that the information provided is accurate and I consent to being contacted regarding this training programme and related tourism development initiatives.
        </p>
        <label className="mt-3 flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent === true}
            onChange={(e) => setField('consent', e.target.checked)}
            className="rounded text-amber-500"
          />
          <span className="font-medium">Yes, I agree *</span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">How did you hear about this programme? *</label>
        <div className="space-y-2">
          {HOW_HEARD.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="howDidYouHear"
                checked={form.howDidYouHear === opt}
                onChange={() => setField('howDidYouHear', opt)}
                className="text-amber-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {errors.howDidYouHear && <p className="mt-1 text-sm text-red-600">{errors.howDidYouHear}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Optional: Are you willing to participate in post-training surveys or impact assessments?
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="postTrainingSurvey"
              checked={form.postTrainingSurvey === 'Yes'}
              onChange={() => setField('postTrainingSurvey', 'Yes')}
              className="text-amber-500"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="postTrainingSurvey"
              checked={form.postTrainingSurvey === 'No'}
              onChange={() => setField('postTrainingSurvey', 'No')}
              className="text-amber-500"
            />
            <span>No</span>
          </label>
        </div>
      </div>
    </SectionLayout>
  );
}
