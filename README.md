# Insightful Reviews

This project is a web application that uses the OpenAI API to analyze and summarize customer reviews from e-commerce platforms.

## Project Description

The application allows users to upload an Excel file containing customer reviews, specify some analysis parameters, and then generates a summary of the reviews using the OpenAI API. The application is designed to be easy to use, with a simple web interface created using Streamlit.

## Installation

To install and run this project, follow these steps:

1. Clone the repository:
git clone https://github.com/yourusername/projectname.git

2. Install the required Python packages:
pip install -r requirements.txt

3. Run the Streamlit application:
streamlit run app.py

## Project Structure

The project has a modular structure, with each Python file serving a specific purpose:

- analyze.py: Contains functions related to the OpenAI API and generating prompts for the AI model.
- app.py: The main application file that uses Streamlit to create a web interface.
- configs.py: Contains configuration constants used across the application.

The project also includes the following directories:

- services: Contains files related to business logic, such as reading and processing Excel files (filereader.py).
- pages: Contains files related to the presentation logic of the Streamlit application, such as creating and managing different pages (function.py, home.py, pricing.py, info.py).
- tests: Contains test files for the code in the main application.
- static: Contains static files like images.

Sensitive information like API keys are stored in environment variables, which are loaded from a .env file using the dotenv package.

## Key Files

- app.py: This is the main entry point of the application. It sets up the Streamlit interface and manages the navigation between different pages.
- filereader.py: This file contains the FileReader class, which is used to read and process the Excel files containing customer reviews.
- analyze.py: This file contains functions for generating prompts for the AI model and getting the completion from the OpenAI API.
- function.py: This file contains the code for the function page of the Streamlit application, where users upload their file and specify analysis parameters.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the terms of the MIT license. 
