# Insight Reviews

Insightful Reviews is a web application that utilizes Large Language Models via APIs from OpenAI and Anthropic to summarize and analyze customer reviews from e-commerce platforms. 

This tool can generate comprehensive, as well as tailored, insights based on the user's role and specific areas of interest. It also allows the user to pose specific questions regarding customer feedback. 

Insightful Reviews provides an intuitive user interface, enabling users to upload raw review data, select their roles, choose the focus of the analysis, and receive detailed, role-specific reports generated from the analysis.

##  About the Application

Insightful Reviews consists of four main pages, each designed with the end user in mind:

1. **Home**: This page serves as an introduction to the application. It showcases the value and functionality of the tool to potential users, offering a detailed overview of what the tool can achieve.

2. **Functionality**: The core of the application resides on this page. Here, users can upload review data, select their preferred analysis parameters, and generate comprehensive, tailored insights into customer feedback.

3. **Pricing**: To cater to different needs and budgets, this page outlines the various pricing tiers available for the tool. Users can review and select the plan that best suits their requirements.

4. **Contact**: If users have any queries or feedback, they can reach out directly to the developer through the contact page. Communication is key to improving our services, and we greatly value your input.

**Disclaimer**: Please note, this web application serves only as a functional demonstration of the official/for-profit version of the e-commerce review analysis application. For further details or if you are interested in using the application for commercial purposes, do not hesitate to reach out.

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
- filereader.py: This file contains the FileReader class, which is used to read, validate, preprocess and extract the Excel files containing customer reviews.
- analyze.py: This file contains functions for generating prompts for the AI model and getting the completion from OpenAI / Anthropic APIs.
- function.py: This file contains the code for the function page of the application, where users upload the Excel file and specify analysis parameters.

## Setup and Usage

**Disclaimer**: Please note, this web application serves only as a functional demonstration of the official/for-profit version of the e-commerce review analysis application. For further details or if you are interested in using the application for commercial purposes, do not hesitate to reach out.

The application is deployed on streamlit community cloud and can be accessed directly through https://insightful.streamlit.app/

To install and run this project on your local machine, follow the following steps:

1. Clone the repository to your local machine.

2. Install the necessary dependencies via pip:
`pip install -r requirements.txt`

3. Set up your OpenAI and Anthropic API keys. You can do this by either storing them in a local .env file, or set up a .secret file and manage your keys using streamlit.secret.

4. Run the application:
`streamlit run app.py`

5. Navigate to the URL displayed in the console (usually http://localhost:8501) to interact with the application.

## Contributing

Feel free to contribute to this project by submitting a pull request. If you encounter any issues or have any suggestions, please open an issue.

## License

This project is licensed under the terms of the MIT license. 
