import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormContext';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { buildSubmitPayload } from '../utils/formPayload';
import { submitRegistration, sendEmailConfirmation, DUPLICATE_REGISTRATION_CODE } from '../api/mockApi';

function Row({ label, value }) {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(', ') : value;
  return (
    <div className="border-b border-slate-100 py-2">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-slate-800">{display}</dd>
    </div>
  );
}

export function Summary() {
  const { form, resetForm } = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const payload = buildSubmitPayload(form);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const result = await submitRegistration(payload);
      await sendEmailConfirmation(form.email, result.id);
      resetForm();
      navigate('/thank-you', { state: { emailSent: true } });
    } catch (err) {
      const isDuplicate = err.code === DUPLICATE_REGISTRATION_CODE || err.response?.data?.code === DUPLICATE_REGISTRATION_CODE;
      setError(isDuplicate ? err.message : (err.response?.data?.message || err.message || 'Submission failed. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto max-w-2xl">
        <ProgressIndicator />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Review your answers</h1>
        <p className="text-slate-600 mb-6">Confirm the information below before submitting. You can go back to edit any section.</p>

        <dl className="space-y-0 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <Row label="Full Name" value={payload.fullName} />
          <Row label="Gender" value={payload.gender} />
          <Row label="Age Range" value={payload.ageRange} />
          <Row label="Phone" value={payload.phone} />
          <Row label="Email" value={payload.email} />
          <Row label="City / Region" value={payload.cityRegion} />
          <Row label="Type of Participant" value={payload.participantType} />
          <Row label="Organization Name" value={payload.orgName} />
          <Row label="Tourism Sub-sector" value={payload.tourismSubSector} />
          {payload.tourismSubSectorOther && <Row label="Sub-sector (Other)" value={payload.tourismSubSectorOther} />}
          <Row label="Years of Experience" value={payload.yearsExperience} />
          <Row label="Digital Skills Level" value={payload.digitalSkillsLevel} />
          <Row label="Tools Used" value={payload.toolsUsed} />
          <Row label="Biggest Challenges" value={payload.biggestChallenges} />
          <Row label="Hope to Gain" value={payload.hopeToGain} />
          <Row label="Training Interests" value={payload.trainingInterests} />
          <Row label="Preferred Format" value={payload.preferredFormat} />
          <Row label="Availability" value={payload.availability} />
          <Row label="Device Access" value={payload.deviceAccess} />
          <Row label="How did you hear" value={payload.howDidYouHear} />
          <Row label="Post-training survey" value={payload.postTrainingSurvey} />
        </dl>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/section-f"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Back to edit
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Confirm & Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
