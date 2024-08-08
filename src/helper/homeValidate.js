export const validate = (formData) => {
  const newFormError = {};
  if (!formData.title) {
    newFormError.title = "Title is required field 😪";
  } else if (formData.title.length < 20) {
    newFormError.title = "The title is too short (at least 20 characters) 🩳";
  } else if (formData.title.length > 35) {
    newFormError.title = "The title is too long (maximum of 30 characters)🪘";
  }
  if (!formData.description) {
    newFormError.description = "Description is required 😪";
  } else if (formData.description.length < 150) {
    newFormError.description = "The description is too short (at least 150 characters) 🩳";
  } else if (formData.description.length > 300) {
    newFormError.description = "The description is too long (maximum of 300 characters) 🪘";
  }
  return newFormError;
};
