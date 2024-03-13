const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipes");
const { addForm, editForm } = require("../controllers/recipeForm");

const {
  addRecipeValidation,
  updateRecipeValidation,
  deleteRecipeValidation,
} = require("../validators/index");

router.get("/new", addForm);
router.get("/:id/edit", editForm);

router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", addRecipeValidation(), recipeController.createRecipe);
router.patch("/:id", updateRecipeValidation(), recipeController.updateRecipe);
router.delete("/:id", deleteRecipeValidation(), recipeController.deleteRecipe);

module.exports = router;
