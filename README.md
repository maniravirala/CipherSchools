# Exam Studio

## Overview

**Exam Studio** is a secure platform for creating and taking MCQ tests. It offers a modern, intuitive test-taking experience with robust security features. 🛡️📚

## User Account for Testing

Explore the platform with these credentials:
- **Email**: raviralamani5@gmail.com
- **Password**: Exam@123

🔒 **Note**: Results won't be shared. Sign up to receive them. We don’t store passwords.

## Key Security Features

- **Secure Test Environment**: Opens in a separate window with disabled browser extensions. 🖥️

- **Copy-Paste & Context Menu Disabled**: Prevents tampering. 🚫✂️

- **Context-Based Authentication**: Ensures secure access to all routes. 🔐

- **Eco-Friendly MCQ Interface**: Intuitive and easy to navigate. 🌿🧩

- **Persistent Timer**: Tracks test duration across page reloads. ⏱️

- **Automated Evaluation**: Tests are evaluated every hour and results are sent to students. 📈📧


## What I Have Done and Learned

- **Test Creation**: Added features for creating and managing MCQs. ✏️

- **User Authentication**: Implemented secure login with cookies. 🍪

- **CORS Configuration**: Set up for multiple origins. 🌐

- **Email Notifications**: Custom email service for test scores. 📬

- **Test Evaluation**: Automated grading with cron jobs. 🕒

- **Route Protection**: Secured with authentication middleware. 🔒

- **Token Management**: Used JWT for user authentication. 🎟️

- **Database Integration**: Connected to MongoDB. 💾

- **Error Handling**: Implemented custom error management. ⚠️

- **Dynamic Routing**: For test data and user info. 🔄

- **Test Timer**: Persistent across page reloads. ⏲️

- **Environment Configuration**: Managed for both backend and frontend. ⚙️


## Features

- **Test Creation**: Manage MCQ sections. 📝
- **User Authentication**: Secure login with cookies. 🔑
- **Test Taking**: Real-time feedback and navigation. 🚀
- **Timer**: Tracks duration persistently. ⏳
- **Email Notifications**: Automated test scores and feedback. 📩

## Tech Stack

- **Frontend**: React, Tailwind CSS, Shadcn UI 🌟
- **Backend**: Node.js, Express.js, MongoDB 🔧
- **Authentication**: JWT, Cookies 🍪🔐
- **Email Service**: NodeMailer 📧

## Setup and Configuration

### Backend

1. Clone the repo:
    ```bash
    git clone https://github.com/maniravirala/CipherSchools.git
    cd CipherSchools/Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file:
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

1. Navigate to the frontend directory:
    ```bash
    cd CipherSchools/Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file:
    ```plaintext
    VITE_API_URL=http://localhost:8000/api
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Screenshots

- **Register Page**: ![Register Page](./Frontend/src//assets/ScreenShots/signup.png)

- **Login Page**: ![Login Page](./Frontend/src//assets/ScreenShots/login.png)

- **Dashboard**: ![Dashboard](./Frontend/src/assets/ScreenShots/dashboard.png)

    ![Dashboard2](./Frontend/src/assets/ScreenShots/dashboard2.png)

- **Permissions Page**: ![Permissions](./Frontend/src/assets/ScreenShots/permissions.png)

- **Test Taking Interface**: ![Test Interface](./Frontend/src/assets/ScreenShots/mcq.png)

- **On Reload**: ![Interface2](./Frontend/src/assets/ScreenShots/mcqonreload.png)

- **Restriction**: ![CopyPaste](./Frontend/src/assets/ScreenShots/copypaste.png)

- **Email Notification**: ![Email Screenshot](./Frontend/src/assets/ScreenShots/mail.png)

## Template

```markdown
### `src/app.js`


const express = require('express');
const app = express();

## Acknowledgements

- **React**: For the UI. ⚛️
- **Tailwind CSS**: For styling. 🌐
- **Shadcn UI**: For UI components. 🏗️
- **Express.js**: For backend services. 🚀
- **MongoDB**: For database. 📊

## License

Licensed under MIT. See [LICENSE](LICENSE) for details. 📝
