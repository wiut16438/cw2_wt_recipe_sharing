const recipeService = require("../services/dbService");

const addForm = (req, res) => {
  res.render("recipeForm", { recipe: null, errors: {} });
};

const editForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getById(id);
  if (recipe) {
    if (recipe.ingredients && !Array.isArray(recipe.ingredients)) {
      recipe.ingredients = [recipe.ingredients];
    }

    if (recipe.steps && !Array.isArray(recipe.steps)) {
      recipe.steps = [recipe.steps];
    }
    
    res.render("recipeForm", { recipe, errors: {} });
  } else {
    res.status(404).send("Recipe not found");
  }
};

module.exports = { addForm, editForm };
