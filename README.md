# Insightful Reviews

This project is a web application that uses the OpenAI API to analyze and summarize customer reviews from e-commerce platforms.

## Project Description

The application allows users to upload Excel files exported from major Chinese E-commerce websites containing customer reviews, specify some analysis parameters, and then generates an analysis of the reviews using the OpenAI API. The application is designed to be easy to use, with a simple web interface created using Streamlit.

Please be aware that this web application serves only as a functional demonstration of the official version of the e-commerce review analysis application. Please contact me for more information if you are interested.
## Installation

To install and run this project, follow these steps:

1. Clone the repository:
git clone https://github.com/yourusername/projectname.git

2. Install the required Python packages:
pip install -r requirements.txt

3. Run the Streamlit application:
streamlit run app.py

## Project Structure

The project has a modular structure, with key directories and files serving a specific purpose:
- services: Contains files related to business logic, such as processing Excel files and interacting with LLM APIs (filereader.py, analyze.py).
  - filereader.py: Contains the methods for reading and processing Excel files.
  - analyze.py: Contains functions related to the OpenAI API and generating prompts for the AI model. Please be aware that this web application serves only as a functional demonstration of the official version of the e-commerce review analysis application, and the prompts in this file is not used in the official application.
- app.py: The main application file that uses Streamlit to create a web interface.
- app_pages: Contains files related to the presentation logic of the Streamlit application, such as creating and managing different pages (function.py, home.py, pricing.py, info.py).
- tests: Contains test files for the code in the main application.
- assets: Contains static files like images.
- styles: Styling files. 
- configs.py: Configuration constants used across the application.

Sensitive information like API keys and emails are stored in environment variables, which are loaded from a .env file using the dotenv package.

### Key Files

- app.py: This is the main entry point of the application. It sets up the Streamlit interface and manages the navigation between different pages.
- filereader.py: This file contains the FileReader class, which is used to read and process the Excel files containing customer reviews.
- analyze.py: This file contains functions for generating prompts for the AI model and getting the completion from the OpenAI API.
- function.py: This file contains the code for the function page of the Streamlit application, where users upload their file and specify analysis parameters.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the terms of the MIT license. 
