# Feeln Forms – Seminar Onboarding

React + Tailwind + Axios multi-step form for seminar member onboarding. Each section is a separate route; answers are kept in draft until final submission.

## Setup

```bash
cd feelnforms
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app starts at Section A and guides users through to a summary, then submit.

## Features

- **Sections as routes**: Section A (Personal) → B (Organization) → C (Digital & Skills) → D (Training) → E (Logistics) → F (Consent) → Summary → Thank you
- **Draft state**: Form state is kept in React context; nothing is sent to the backend until "Confirm & Submit" on the summary page
- **Back/Next**: Users can move back to earlier sections to edit
- **Progress indicator**: Shows current section and links to each section
- **Validation**: Required fields (name, phone, email, region, consent, how did you hear); minimum selections enforced for multi-selects (e.g. tourism sub-sector, tools used, training interests up to 5)
- **Summary**: Review page lists all answers before submission
- **Email confirmation**: Simulated in the mock API (toggle `SIMULATE_API` in `src/api/mockApi.js` when connecting to a real backend)

## Connecting a real backend

1. In `src/api/mockApi.js`, set `SIMULATE_API = false` and set `BASE_URL` to your API base URL.
2. Ensure your API exposes:
   - `POST /api/registrations` – body: form payload; response: `{ id, message?, emailSent? }`
   - `POST /api/confirmations` – body: `{ email, registrationId }`; response: `{ sent? }`
3. Payload shape is built in `src/utils/formPayload.js` (`buildSubmitPayload`).

## Tech stack

- React 18, Vite, React Router 6
- Tailwind CSS
- Axios (for API calls)
