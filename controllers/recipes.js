const recipeService = require("../services/dbService");
const recipeSchema = require("../validators/recipeSchema");
const Joi = require("joi");
const { validationResult } = require("express-validator");

const getAllRecipes = async (req, res) => {
  try {
    const { category, popularity } = req.query;
    const recipes = await recipeService.getAll({ category, popularity });
    res.render("index", { recipes });
  } catch (error) {
    res.status(404).json({ message: "Recipes not found" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getById(id);
    if (recipe) {
      res.render("recipe", { recipe });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occurred while creating the recipe." });
  }
};

const createRecipe = async (req, res) => {
  const data = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const createdRecipe = await recipeService.create(data);
    res.json({ message: "Ticket successfully added!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occurred while creating the recipe." });
  }
};

const updateRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const updatedRecipe = await recipeService.update(id, req.body);
    if (updatedRecipe) {
      if (req.xhr || req.headers.accept.indexOf("json") > -1) {
        res.json({
          message: "Recipe successfully updated",
          recipe: updatedRecipe,
        });
      } else {
        res.redirect("/recipes");
      }
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occurred while updating the recipe." });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await recipeService.delete(id);
    if (success) {
      res.redirect("/recipes");
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occurred while creating the recipe." });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
