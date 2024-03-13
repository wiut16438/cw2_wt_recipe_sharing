const Joi = require("joi");

const recipeValidationSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.min": `Title must be at least 3 characters long.`,
    "any.required": `Please provide title.`,
  }),
  category: Joi.string().required().messages({
    "any.required": `Please provide category name`,
  }),
  popularity: Joi.number().min(1).max(5).required().messages({
    "number.min": `Popularity must be between 1 and 5.`,
    "number.max": `Popularity must be between 1 and 5.`,
    "any.required": `Please provide popularity range`,
  }),
  ingredients: Joi.string().required().messages({
    "any.required": `Please provide ingredients.`,
  }),
  steps: Joi.string().required().messages({
    "any.required": `Steps are required.`,
  }),
});

module.exports = recipeValidationSchema;
