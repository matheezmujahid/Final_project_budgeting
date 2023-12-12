# Budgeting APP

This is an application for personal budget management built with React for the front end and Express with MySQL for the backend. The app enables users to manage their budget, featuring user authentication, configuration settings for allocated and used budgets, and visualization dashboards.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Available Scripts](#available-scripts)

## Features

- *About Page:* Provides a user-centric overview of the website.
- *User Authentication:* Includes login and register pages for user authentication.
- *Configuration Page:* Allows users to set allocated and used budgets.
- *Dashboards:* Utilizes visualizations like bar graphs, pie charts, and tables for effective budget tracking.
- *Logout:* Offers a secure logout mechanism.

## Technologies Used

Frontend:
- React

Backend:
- Express.js
- MySQL

Other Technologies:
- CORS
- Body-parser
- JWT (JSON Web Tokens)
- Compression

## Getting Started

### Prerequisites

- Node.js
- MySQL database

### Installation

1. Clone the repository:

    bash
    git clone https://github.com/matheezmujahid/Final_project_budgeting
    

2. Install dependencies:

    bash
    cd NBADProject
    npm install
    

### Configuration

- Set up a MySQL database and configure the connection details in the backend.
- Create a .env file in the backend directory and add the necessary environment variables.

### Usage

1. Start the backend server:

    bash
    cd nbadproject
    node server.js
    

2. Start the React app:

    bash
    cd nbadproject
    npm start
    

3. Open the app in your browser: 155.138.219.54:3000

## API Endpoints

- /api/login: User login endpoint.
- /api/register: User registration endpoint.
- /api/api/get-all-categories: Fetches all categories.
- /api/configure-budget: Configures the budget.
- /api/get-table-data: Retrieves table data.
- /api/enter-used-budget: Logs the used budget.

## Contributing

Feel free to contribute to the project. Fork the repository, make changes, and submit a pull request.

## Available Scripts

In the project directory, you can run:

- npm start: Runs the app in development mode. Open 155.138.219.54:3000 in your browser.
- npm test: Launches the test runner in interactive watch mode.
- npm run build: Builds the app for production in the build folder, optimizing it for performance.
