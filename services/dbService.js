const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/recipes_db.json");

async function readRecipesFromFile() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading from file:", err);
    return [];
  }
}

async function writeToFile(recipes) {
  try {
    await fs.writeFile(filePath, JSON.stringify(recipes, null, 4), "utf8");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
}

const recipeService = {
  async getAll(filters = {}) {
    let recipes = await readRecipesFromFile();

    if (filters.category) {
      recipes = recipes.filter(
        (recipe) =>
          recipe.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    if (filters.popularity) {
      recipes = recipes.filter(
        (recipe) => Number(recipe.popularity) === Number(filters.popularity),
      );
    }

    return recipes;
  },

  async getById(id) {
    const recipes = await readRecipesFromFile();
    return recipes.find((recipe) => recipe.id === id);
  },

  async create(data) {
    const recipes = await readRecipesFromFile();
    if (data.ingredients && typeof data.ingredients === "string") {
      data.ingredients = data.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
    }

    if (data.steps && typeof data.steps === "string") {
      data.steps = data.steps.split(",").map((step) => step.trim());
    }

    if (data.popularity) {
      data.popularity = parseInt(data.popularity, 10);
    }

    const newRecipe = { id: uuidv4(), ...data };

    recipes.push(newRecipe);
    await writeToFile(recipes);

    return newRecipe;
  },

  async update(id, updateData) {
    let recipes = await readRecipesFromFile();
    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index === -1) return null;
    if (updateData.ingredients && typeof updateData.ingredients === "string") {
      updateData.ingredients = updateData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
    }

    if (updateData.steps && typeof updateData.steps === "string") {
      updateData.steps = updateData.steps.split(",").map((step) => step.trim());
    }

    recipes[index] = { ...recipes[index], ...updateData };
    await writeToFile(recipes);

    return recipes[index];
  },

  async delete(id) {
    let recipes = await readRecipesFromFile();
    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index === -1) return false;

    recipes.splice(index, 1);
    await writeToFile(recipes);
    return true;
  },
};

module.exports = recipeService;
