import { createContext, useContext, useReducer, useCallback } from 'react';

const initialState = {
  fullName: '',
  gender: '',
  ageRange: '',
  phone: '',
  email: '',
  cityRegion: '',
  participantType: '',
  orgName: '',
  tourismSubSector: [],
  tourismSubSectorOther: '',
  yearsExperience: '',
  digitalSkillsLevel: '',
  toolsUsed: [],
  biggestChallenges: '',
  hopeToGain: '',
  trainingInterests: [],
  preferredFormat: '',
  availability: [],
  deviceAccess: '',
  consent: false,
  howDidYouHear: '',
  postTrainingSurvey: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_FIELDS':
      return { ...state, ...action.fields };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

const FormContext = createContext(null);

export function FormProvider({ children }) {
  const [form, dispatch] = useReducer(reducer, initialState);

  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const setFields = useCallback((fields) => {
    dispatch({ type: 'SET_FIELDS', fields });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = { form, setField, setFields, resetForm };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
