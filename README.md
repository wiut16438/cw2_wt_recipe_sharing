# Recipe Sharing Platform

## About the App

This is the platform in which people can share their recipes with others. They can create, read, update and delete recipes (CRUD operations). As extra features, filtering by popularity and searching by category name have also been implemented.

## Getting Started

To get started, please make sure that you have Node.js and npm installed on your system.

### Installing

Follow these steps to get your development environment running:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/wiut16438/cw2_wt_recipe_sharing
    ```

2. Navigate to the project directory:
    ```bash
    cd cw2_wt_recipe_sharing
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Dependencies

This application uses the following dependencies:

- body-parser: parses incoming request bodies
- cors: enables Cross-Origin Resource Sharing (CORS)
- dotenv: loads environment variables from a .env file into process.env 
- express: a web application framework for Node.js
- express-validator: middleware for validating and sanitizing request data in Express applications.
- method-override: allows the use of HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- nodemon: monitors for any changes in your source and automatically restarts your server, used in development.
- pug: a template engine for Node.js, allowing for writing simplified HTML templates.
- uuid: generates unique identifiers (UUIDs), useful for object identification.

## Additional Resources

- Source code: https://github.com/wiut16438/cw2_wt_recipe_sharing
- Demo: https://cw2-16438-recipe-sharing.up.railway.app/

## Project Structure

```/Root
├── app.js
├── package.json
├── .gitignore
├── /controllers
│ ├── home.js
│ ├── recipeForm.js
│ └── recipes.js
├── /data
│ └── recipes_db.json
├── /public
│ ├── /css
│ │ ├── card.css
│ │ ├── common.css
│ │ ├── form.css
│ │ ├── header.css
│ │ ├── home.css
│ │ ├── recipe.css
│ │ └── style.css
│ ├── /js
│ │ └── formValidation.js
│ └── /images
│ └── recipe-main.jpg
├── /routes
│ ├── form.js
│ ├── home.js
│ └── recipes.js
├── /services
│ └── dbService.js
├── /validators
│ └── index.js
└── /views
├── index.pug
├── layout.pug
├── navbar.pug
├── recipe.pug
├── recipeForm.pug
└── recipes.pug```

- `controllers`: Logic to handle incoming requests and render responses.
- `data`: Contains a json file to store data.
- `public`: Static files like stylesheets, JavaScript, and images, accessible to clients.
- `routes`: URL routes and their corresponding handlers.
- `services`: Business logic for json file interaction
- `validators`: Logic to validate request data.
- `views`: Pug templates for generating HTML content.

- Suggested project structure has been followed although minor differences exist.


