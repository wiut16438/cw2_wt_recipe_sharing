function clearErrorMessage(inputElement) {
  const nextSibling = inputElement.nextSibling;
  if (nextSibling && nextSibling.classList.contains("error-message")) {
    nextSibling.remove();
  }
  inputElement.classList.remove("is-invalid");
}

function setupInputEventListeners() {
  document.querySelectorAll(".form-control").forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      clearErrorMessage(inputElement);
    });
  });
}

function submitForm() {
  const recipeData = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    ingredients: document
      .getElementById("ingredients")
      .value.split(",")
      .map((ingredient) => ingredient.trim()),
    steps: document
      .getElementById("steps")
      .value.split(",")
      .map((step) => step.trim()),
    popularity: document.getElementById("popularity").value,
  };

  const url = "#{recipe && recipe.id ? `/recipes/` + recipe.id : '/recipes'}";
  const method = "#{recipe && recipe.id ? 'PATCH' : 'POST'}";

  fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, body: data })),
    )
    .then((obj) => {
      if (obj.status !== 200) {
        document
          .querySelectorAll(".error-message")
          .forEach((el) => el.remove());
        document
          .querySelectorAll(".form-control")
          .forEach((el) => el.classList.remove("is-invalid"));

        obj.body.errors.forEach((error) => {
          const element = document.getElementById(error.path);
          const errorMessage = document.createElement("div");
          errorMessage.textContent = error.msg;
          errorMessage.classList.add("error-message", "text-danger");
          element.classList.add("is-invalid");
          element.parentNode.insertBefore(errorMessage, element.nextSibling);
        });
      } else {
        alert("Success!");
        window.location.href = "/recipes";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
  setupInputEventListeners();
}

document.addEventListener("DOMContentLoaded", (event) => {
  setupInputEventListeners();
});
