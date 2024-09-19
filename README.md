# Document Data Extraction Application

## Overview

This application extracts structured data from a plain text document and converts it into a JSON format. It extracts key information, such as the document title, key entities (e.g., names, dates, locations), a summary of the document, and an outline of sections and bullet points. The application contains error handling, ESLint for code linting, and a continuous integration (CI) setup.

### Features:
- **Text Document Processing**: Accepts `.txt` documents for data extraction.
- **Data Extraction**:
  - **Title**: Extracts the title (first line or a default message).
  - **Entities**: Extracts names, dates, and locations.
  - **Summary**: Summarizes the document.
  - **Outline**: Creates an outline with section headings and bullet points.
- **Production-Ready Code**:
  - Error handling for file operations and missing data.
  - ESLint for linting and code quality enforcement.
  - Continuous integration (CI) pipeline using GitHub Actions.

## Requirements

- **Node.js**: >=14.x
- **npm**: >=6.x

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mattfortuna/DDE.git
   cd DDE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To run the application, follow these steps:

1. **Prepare the text file**: Place your `.txt` document in the `test/` folder, or modify the path in `src/index.js` to point to your document.

2. **Run the extraction**: 

   ```bash
   node src/index.js
   ```

   The output will be logged to the console in JSON format. If any issues occur (e.g., file not found), the application will log an error message.

## Available Features

### 1. **File Reading and Error Handling**
   The application reads text files and gracefully handles common errors like missing or empty files.

   - If the file does not exist, you will see an error message.
   - If the document is empty, it will return an appropriate error.

### 2. **Data Extraction**
   The application extracts the following:
   - **Title**: The first line of the document is treated as the title.
   - **Entities**: Names, dates, and locations are extracted using regular expressions.
   - **Summary**: A brief summary of the document is generated based on its content.
   - **Outline**: The document is divided into sections, and each section’s key points are listed.

### 3. **Linting and Code Quality**
   - To check the code style and errors: (With some more time I would work out the kinks in the lint config so that the current errors it shows don't show.)

     ```bash
     npm run lint
     ```

### 4. **Testing**
   The application includes unit tests for key functions using **Jest**.
   
   To run the tests:
   ```bash
   npm test
   ```

### 5. **CI/CD Pipeline**
   The project includes a GitHub Actions CI/CD pipeline that automatically runs tests on every push to the `main` branch.

## Development

If you want to modify the code or add new features, here’s how to get started:

1. **Linting**: Before committing code, run the linter to check for any issues.

   ```bash
   npm run lint
   ```

2. **Testing**: Ensure that the tests pass before submitting any changes.

   ```bash
   npm test
   ```

3. **Running in a Different Environment**: The application can be configured to run in different environments (development, production) using environment variables in your terminal.

## Future Enhancements

- **Support for PDF and DOCX Files**: Currently, only `.txt` files are supported. Future versions could support additional file types.
- **Advanced Entity Extraction**: Use natural language processing (NLP) libraries to improve entity extraction.
- **Web Interface**: Add a front-end to upload and process documents via a web interface.