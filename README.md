# Exam Studio

## Overview

**Exam Studio** is a secure and comprehensive platform for creating and taking multiple-choice question (MCQ) tests. This system ensures a robust test-taking experience with enhanced security features and a modern tech stack.

### Key Security Features

- **Secure Test Environment**: Tests open in a separate window where browser extensions are disabled to prevent tampering.
- **Copy-Paste and Context Menu Disabled**: Copy-paste functionality and right-click context menus are disabled to ensure the integrity of the test.
- **Context-Based Authentication**: Every route is protected through context-based authentication, ensuring secure access to the test and other functionalities.
- **User-Friendly MCQ Interface**: The MCQ test interface is designed to be eco-friendly and intuitive, with easy navigation to enhance user experience.
- **Persistent Timer**: The timer tracks the test duration across page reloads by syncing with the server, so users don't need to worry about timing issues.
- **Automated Test Evaluation**: A cron job runs every hour to evaluate tests and send results to students, ensuring timely feedback.

## What I Have Done and Learned

- **Implemented Test Creation**: Developed a feature to create MCQ tests with options for adding and configuring questions.
- **User Authentication**: Integrated user authentication using cookies for secure login and session management.
- **CORS Configuration**: Configured CORS to handle requests from multiple origins securely.
- **Email Notifications**: Created and configured an email template for sending test scores and notifications using a custom email service.
- **Test Evaluation**: Implemented a test evaluation system with cron jobs for automatic grading.
- **Route Protection**: Secured routes with authentication middleware to prevent unauthorized access.
- **Token Management**: Used JWT for token generation and verification to authenticate users.
- **Database Integration**: Connected the backend API with MongoDB to store test data and user information.
- **Custom Error Handling**: Implemented custom error handlers to manage exceptions and errors.
- **Dynamic Route Generation**: Created dynamic routes to display test data and user information.
- **Test Timer**: Developed a persistent timer feature to track test duration across page reloads.
- **Environment Configuration**: Managed environment variables for both backend and frontend applications.

## Features

- **Test Creation**: Create and manage multiple types of MCQ sections.
- **User Authentication**: Secure login system using cookies.
- **Test Taking**: Users can attempt tests with real-time feedback and navigation.
- **Timer**: Persistent timer to track test duration.
- **Email Notifications**: Automated emails with test scores and feedback.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Cookies
- **Email Service**: NodeMailer

## Setup and Configuration

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/maniravirala/CipherSchools.git
    cd CipherSchools/Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```plaintext
    JWT_SECRET=your_jwt_secret_here
    JWT_EXPIRES_IN=10
    CLIENT_URL=http://localhost:5173
    PORT=8000
    MONGO_URI=your_mongo_uri_here
    EMAIL_USER=your_email_user_here
    EMAIL_PASS=your_email_pass_here
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/maniravirala/CipherSchools.git
    cd CipherSchools/Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```plaintext
    VITE_API_URL=http://localhost:8000/api
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Screenshots

- **Test Creation Page**: ![Test Creation](path/to/screenshot1.png)
- **Test Taking Interface**: ![Test Interface](path/to/screenshot2.png)
- **Email Notification**: ![Email Screenshot](path/to/email-screenshot.png)

## Acknowledgements

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **Shadcn UI**: For additional UI components.
- **Express.js**: For backend API services.
- **MongoDB**: For database management.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

