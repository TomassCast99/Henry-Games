export function validation(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Enter the name please";
  } else if (input.name.search(/^[a-zA-Z\s]*$/)) {
    errors.name = "No numbers or symbols are allowed in the name";
  }
  if (!input.description) {
    errors.description = "You have to put a description please";
  }
  if (!input.rating) {
    errors.rating = "You need a rating";
  } else if (input.rating < 0 || input.rating > 5) {
    errors.rating = "Only values between 1 and 5 please";
  }
  if (!/^[1-5]+$/.test(input.rating)) {
    errors.rating = "Only numbers please";
  }
  if (!input.genres.length) {
    errors.genres = "You have to select at less 1(one) genre please";
  }
  if (!input.platform.length) {
    errors.platform = "You have to select at less 1(one) platform please";
  }

  if (
    !input.name ||
    !input.description ||
    !input.rating ||
    !input.genres ||
    !input.platform
  ) {
    errors.input = "You have to complete all the fields";
  }

  return errors;
}
