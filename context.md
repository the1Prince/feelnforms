# Feeln Forms – Project Context

## What this is

Multi-step seminar onboarding form. Respondents move through six sections (Personal → Organization → Digital & Skills → Training → Logistics → Consent), review a summary, then submit. Data is held in draft until final submission; backend is simulated by default.

## Tech stack

- **React 18** + **Vite**
- **React Router 6** – one route per section plus summary and thank-you
- **Tailwind CSS** – styling
- **Axios** – API calls (mock or real)

## Project structure

```
feelnforms/
├── src/
│   ├── api/
│   │   └── mockApi.js          # submitRegistration, sendEmailConfirmation (simulated or real)
│   ├── components/
│   │   ├── ProgressIndicator.jsx   # Section A–F links + "Section X of 6"
│   │   └── SectionLayout.jsx       # Wraps each section: title, Back/Next, optional validate
│   ├── constants/
│   │   └── ghanaRegions.js     # 16 Ghana regions for City/Region dropdown
│   ├── context/
│   │   └── FormContext.jsx     # Form state (draft), setField, setFields, resetForm
│   ├── pages/
│   │   ├── SectionA.jsx … SectionF.jsx
│   │   ├── Summary.jsx         # Review + Confirm & Submit
│   │   └── ThankYou.jsx        # Post-submit + email confirmation message
│   ├── utils/
│   │   ├── formPayload.js      # buildSubmitPayload(form) for API
│   │   └── validation.js       # validateSectionA–F, validateAll, isSectionValid
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── context.md                  # This file
├── README.md
└── package.json
```

## Key conventions

- **Form state**: Single source of truth in `FormContext`; no per-section persistence to backend until submit.
- **Validation**: Per-section validators in `src/utils/validation.js`; each section page calls its validator on "Next" (and Summary expects all required fields to have been validated in sections).
- **Required fields**: Full name, phone, email, city/region, consent, how did you hear. Minimum selections enforced for tourism sub-sector, tools used, and training interests (1–5).
- **API**: Toggle `SIMULATE_API` in `src/api/mockApi.js`; when false, set `BASE_URL`. Expected endpoints: `POST /api/registrations`, `POST /api/confirmations`.

## Preventing duplicate registrations

- **Backend (required)**: The only reliable way to prevent multiple registrations per person is on the server. Before inserting a registration, check that the identifier (e.g. email, or email + phone) does not already exist. If it does, respond with **409 Conflict** (or 422) and a body the frontend can recognise, e.g. `{ "code": "ALREADY_REGISTERED", "message": "This email is already registered. Use a different email or contact us to update your details." }`. The frontend treats `code === "ALREADY_REGISTERED"` (or the same message) and shows the `message` without clearing the form so the user can change email or contact you.
- **Mock**: With `SIMULATE_API` true, the app uses `localStorage` key `feelnforms_submitted_emails` to simulate “already registered” by email (normalised, lowercased). Submitting again with the same email throws an error with `code: "ALREADY_REGISTERED"`.
- **Frontend**: `Summary` catches submit errors; if the error has `code === DUPLICATE_REGISTRATION_CODE` or `err.response?.data?.code === DUPLICATE_REGISTRATION_CODE`, it displays the error message and leaves the form filled so the user can correct and resubmit.

## Routes

| Path         | Purpose                    |
| ------------ | -------------------------- |
| `/`          | Redirects to `/section-a`  |
| `/section-a` … `/section-f` | Questionnaire sections |
| `/summary`   | Review answers, Confirm & Submit |
| `/thank-you` | Success + email confirmation message |

## When editing

- Add or change form fields: update `initialState` in `FormContext.jsx`, the relevant section page, `buildSubmitPayload` in `formPayload.js`, and Summary display if needed.
- Change validation rules: edit `src/utils/validation.js`.
- Change API contract: edit `mockApi.js` and any backend; payload shape is defined by `buildSubmitPayload`.
