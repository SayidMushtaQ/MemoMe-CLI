
export const validate = (formData) => {
  const newFormError = {};
  if (!formData.userIdentifier) {
    newFormError.userIdentifier = "Email or userName is required";
  }
  if (!formData.password) {
    newFormError.password = "Password is required";
  } else if (formData.password.length < 6) {
    newFormError.password = "Password should be at least 6 characters long";
  }
  return newFormError;
};
