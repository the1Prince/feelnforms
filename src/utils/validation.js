const required = (value) => (value == null || String(value).trim() === '' ? 'This field is required' : null);

export const validateSectionA = (form) => {
  const errors = {};
  if (required(form.fullName)) errors.fullName = required(form.fullName);
  if (required(form.phone)) errors.phone = required(form.phone);
  if (required(form.email)) errors.email = required(form.email);
  if (required(form.cityRegion)) errors.cityRegion = required(form.cityRegion);
  return errors;
};

export const validateSectionB = (form) => {
  const errors = {};
  const minTourismSubSector = 1;
  if (
    !form.tourismSubSector?.length ||
    form.tourismSubSector.length < minTourismSubSector
  ) {
    errors.tourismSubSector = `Select at least ${minTourismSubSector} option`;
  }
  return errors;
};

export const validateSectionC = (form) => {
  const errors = {};
  const minTools = 1;
  if (!form.toolsUsed?.length || form.toolsUsed.length < minTools) {
    errors.toolsUsed = `Select at least ${minTools} option`;
  }
  return errors;
};

export const validateSectionD = (form) => {
  const errors = {};
  const minInterests = 1;
  const maxInterests = 5;
  const count = form.trainingInterests?.length ?? 0;
  if (count < minInterests) {
    errors.trainingInterests = `Select at least ${minInterests} and up to ${maxInterests} options`;
  } else if (count > maxInterests) {
    errors.trainingInterests = `Select at most ${maxInterests} options`;
  }
  return errors;
};

export const validateSectionE = () => ({});

export const validateSectionF = (form) => {
  const errors = {};
  if (form.consent !== true) {
    errors.consent = 'You must agree to the declaration to continue';
  }
  if (required(form.howDidYouHear)) errors.howDidYouHear = required(form.howDidYouHear);
  return errors;
};

export const validateAll = (form) => {
  return {
    ...validateSectionA(form),
    ...validateSectionB(form),
    ...validateSectionC(form),
    ...validateSectionD(form),
    ...validateSectionF(form),
  };
};

export const isSectionValid = (section, form) => {
  const validators = {
    A: validateSectionA,
    B: validateSectionB,
    C: validateSectionC,
    D: validateSectionD,
    E: validateSectionE,
    F: validateSectionF,
  };
  const errors = validators[section]?.(form) ?? {};
  return Object.keys(errors).length === 0;
};
