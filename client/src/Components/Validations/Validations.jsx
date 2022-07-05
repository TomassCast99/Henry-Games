export function validation(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Enter the name please";
  } else if (input.name.search(/^[a-zA-Z\s]*$/)) {
    errors.name = "No numbers or symbols are allowed in the name ";
  } else if (input.name[0] === input.name[0].toLowerCase()) {
    errors.name = "The first letter must be uppercase ";
  } else if (input.name.length <= 3 || input.name.length >= 10) {
    errors.name = "The name must contain 3 to 10 characters ";
  }

  if (!input.description) {
    errors.description = "Enter a description please";
  }

  if (!input.rating) {
    errors.rating = "Enter the rating please";
  } else if (input.rating < 0) {
    errors.rating = "Negative numbers are not allowed ";
  }

  if (!input.released) {
    errors.released = "Enter the year please";
  } else if (input.released < 0) {
    errors.released = "Negative numbers are not allowed ";
  }

  if (!input.genres.length) {
    errors.genres = "Chose a genre";
  }
  if (!input.platform.length) {
    errors.platform = "Chose a platform";
  }

  return errors;
}
