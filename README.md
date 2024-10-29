# EasyRecipe

## Introduction
EasyRecipe is a web application designed to help users efficiently manage and discover recipes. The app allows users to create, update, and delete recipes, view a list of recipes, search for specific recipes, and more. It leverages Flask for the backend and React for the frontend to deliver a seamless user experience.


- **Final Project Blog Article:** [Read More](https://medium.com/@salahmalih/behind-the-scenes-of-easyrecipe-a-developers-tale-of-crafting-a-recipe-discovery-tool-b885aebf3d07)
- **Author’s LinkedIn Profile:** [Salah Malih](http://linkedin.com/in/salah-malih)

## Technologies Used
- **Frontend:** React, Material-UI
- **Backend:** Flask, SQLAlchemy
- **Database:** MySQL

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/salahmalih/EasyRecipe-MVP.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd easyrecipe/backend
   ```
3. Install Python dependencies:

4. Configure the database connection in `app.py`:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/db_easyrecipe'
   ```
5. Run the Flask backend:
   ```bash
   python app.py
   ```
   The backend will start on [http://localhost:5000](http://localhost:5000).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd easyrecipe/
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the React frontend:
   ```bash
   npm start
   ```
   The frontend will start on [http://localhost:3000](http://localhost:3000).

## Usage

### Running the Application
- **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser to view the React application.
- **Backend:** Open [http://localhost:5000](http://localhost:5000) to interact with the Flask API.

### Features
- **View Recipes:** List all recipes and view details.
- **Create Recipe:** Add new recipes with title, instructions, and image.
- **Update Recipe:** Modify existing recipes.
- **Delete Recipe:** Remove recipes from the list.
- **Search Recipes:** Find recipes by title or ingredients.
- **User Management:** Register and manage user profiles.
- **Favorites:** Mark and view favorite recipes.

## Contributing
Feel free to contribute by submitting issues or pull requests. For significant changes, please open an issue first to discuss your proposed modifications.

## Licensing
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Screenshots
![image](https://github.com/user-attachments/assets/d4ce4aba-8cd6-4da1-8142-968a0534cd53)


## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and utilizes Flask for the backend.

### Available Scripts
In the project directory, you can run:

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

- **`npm test`**: Launches the test runner in interactive watch mode.

- **`npm run build`**: Builds the app for production to the `build` folder.

- **`npm run eject`**: Removes this tool and copies build dependencies, configuration files, and scripts into the project. This is a one-way operation.

## About Me
I’m Salah Malih, a software developer passionate about building  web applications. Connect with me on [LinkedIn](http://linkedin.com/in/salah-malih).

```
