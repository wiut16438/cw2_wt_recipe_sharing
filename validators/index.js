const { body, param } = require("express-validator");
const recipeService = require("../services/dbService");

const addRecipeValidation = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Recipe title must not be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Event name must be between 3 and 255 characters long"),
    body("category")
      .notEmpty()
      .withMessage("Recipe category must not be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Category name must be between 3 and 255 characters long"),
    body("ingredients").notEmpty().withMessage("Ingredients must not be empty"),
    body("steps").notEmpty().withMessage("Steps must not be empty"),
    body("popularity")
      .notEmpty()
      .withMessage("Popularity rating must not be empty")
      .isInt({ min: 1, max: 5 })
      .withMessage("Popularity rating must be between 1 and 5"),
  ];
};

const deleteRecipeValidation = () => {
  return [
    param("id").custom(async (id) => {
      const exists = await recipeService.getById(id);
      if (!exists) {
        throw new Error("Recipe not found");
      }
    }),
  ];
};

const updateRecipeValidation = () => {
  return [
    param("id").custom(async (id) => {
      const exists = await recipeService.getById(id);
      if (!exists) {
        throw new Error("Recipe not found");
      }
    }),
    body("title")
      .notEmpty()
      .withMessage("Recipe title must not be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Event name must be between 3 and 255 characters long"),
    body("category")
      .notEmpty()
      .withMessage("Recipe category must not be empty")
      .isLength({ min: 3, max: 255 })
      .withMessage("Category name must be between 3 and 255 characters long"),
    body("ingredients").notEmpty().withMessage("Ingredients must not be empty"),
    body("steps").notEmpty().withMessage("Steps must not be empty"),
    body("popularity")
      .notEmpty()
      .withMessage("Popularity rating must not be empty")
      .isInt({ min: 1, max: 5 })
      .withMessage("Popularity rating must be between 1 and 5"),
  ];
};

module.exports = {
  addRecipeValidation,
  updateRecipeValidation,
  deleteRecipeValidation,
};
