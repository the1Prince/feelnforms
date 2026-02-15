import axios from 'axios';

const BASE_URL = '/api';
const SIMULATE_API = true;

/** Key used in localStorage to simulate "already registered" emails (mock only). */
const SUBMITTED_EMAILS_KEY = 'feelnforms_submitted_emails';

/** Error code your backend should return when email/phone is already registered (e.g. 409). */
export const DUPLICATE_REGISTRATION_CODE = 'ALREADY_REGISTERED';

function getSubmittedEmails() {
  try {
    const raw = localStorage.getItem(SUBMITTED_EMAILS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addSubmittedEmail(email) {
  const normalized = String(email).trim().toLowerCase();
  if (!normalized) return;
  const set = new Set(getSubmittedEmails());
  set.add(normalized);
  localStorage.setItem(SUBMITTED_EMAILS_KEY, JSON.stringify([...set]));
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const simulateDelay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const submitRegistration = async (payload) => {
  if (SIMULATE_API) {
    await simulateDelay();
    const email = payload.email?.trim().toLowerCase();
    if (email && getSubmittedEmails().includes(email)) {
      const err = new Error('This email is already registered. Use a different email or contact us to update your details.');
      err.code = DUPLICATE_REGISTRATION_CODE;
      throw err;
    }
    if (email) addSubmittedEmail(email);
    return { id: `reg-${Date.now()}`, message: 'Registration received', emailSent: true };
  }
  const { data } = await api.post('/registrations', payload);
  return data;
};

export const sendEmailConfirmation = async (email, registrationId) => {
  if (SIMULATE_API) {
    await simulateDelay(400);
    return { sent: true };
  }
  const { data } = await api.post('/confirmations', { email, registrationId });
  return data;
};
