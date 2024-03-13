function validateRecipe(data, schema) {
  const errors = {};

  Object.keys(schema).forEach((key) => {
    const rule = schema[key];
    const value = data[key];

    if (rule.required && (!value || value.trim() === "")) {
      errors[key] = rule.message;
    } else if (value) {
      if (rule.minLength && value.length < rule.minLength) {
        errors[key] = rule.message;
      }
      if (
        rule.min !== undefined &&
        (isNaN(value) || value < rule.min || value > rule.max)
      ) {
        errors[key] = rule.message;
      }
    }
  });

  return errors;
}

module.exports = validateRecipe;
