
# 💬 Chat-Application: Real-time Communication Platform

Welcome to our **Chat-Application** project! This is a real-time chat application developed as a school project, designed to facilitate seamless communication through direct messages, group chats, and media sharing.  
Our goal was to build a functional and responsive platform that demonstrates key concepts in modern web and mobile development.

---

## ✨ Key Features

- **Real-time Messaging**: Experience instant message delivery and updates powered by WebSockets.
- **Direct & Group Chats**: Connect with friends in one-on-one conversations or collaborate in dynamic group environments.
- **Media Sharing**: Easily send and receive images within your chats.
- **User & Group Profiles**: Manage your profile and group details, including custom profile pictures.
- **User Authentication**: Secure login and registration system to protect user accounts.
- **Online Status**: See at a glance which of your contacts are currently online.
- **Dynamic Sidebar**: The chat list on your homepage updates in real-time to show the latest conversations.

---

## 🚀 Technologies Used

This project is built using a robust and popular stack, combining the power of Node.js for the backend, React.js for the frontend, and Capacitor for mobile deployment.

### 🛠️ Backend

- **Node.js**: Our server-side runtime, enabling fast and scalable network applications.
- **Express.js**: A lightweight and flexible Node.js web application framework, used for building our RESTful APIs.
- **Socket.IO**: The backbone of our real-time communication, providing bidirectional, event-based communication between clients and the server.
- **MongoDB**: A flexible NoSQL database, chosen for its ability to store our application's data, including users, messages, and groups.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying data interaction and validation.
- **Cloudinary**: A cloud-based service for efficient storage and delivery of all media files (images, videos, audio) shared within the chats.

### 🎨 Frontend

- **React.js**: Our chosen JavaScript library for building the interactive and dynamic user interface.
- **Zustand**: A minimalist, fast, and scalable state-management solution for React, keeping our application's data organized and accessible.
- **Axios**: A powerful, promise-based HTTP client for making requests to our backend APIs.
- **Lucide React**: Provides a set of beautiful and consistent open-source icons, enhancing the visual appeal of our application.
- **React Router DOM**: Used for navigating between different pages and views within our single-page application.

### 📱 Mobile Development

- **Capacitor**: An essential tool that allows us to package our web application into native iOS and Android apps, providing a truly cross-platform experience.

---

## ⚙️ Getting Started (Local Setup)

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher ([Download Node.js](https://nodejs.org))
- **npm or Yarn**: npm v9+ or Yarn v1.22+ (usually comes with Node.js)
- **MongoDB Instance**: A local installation or a cloud-hosted service like MongoDB Atlas
- **Cloudinary Account**: [Sign up](https://cloudinary.com) to handle media uploads

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/Chat-Application.git
cd Chat-Application
```

> Replace `your-username` with the actual GitHub path if you fork or move it.

---

### 🧩 2. Backend Setup

```bash
cd Backend
npm install # or yarn install
```

Create a file named `.env` directly inside the `Backend` directory:

```env
MONGO_DB_URI=your_mongodb_connection_string_here
JWT_SECRET=a_very_strong_and_unique_secret_key_for_jwt_tokens
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
PORT=5001
```

> **Important**: Replace the placeholder values with your actual keys and connection strings. Do not share your `.env` file publicly.

---

### 🖼 3. Frontend Setup

```bash
cd ../Frontend
npm install # or yarn install
```

> The frontend application is configured to communicate with the backend running on `http://localhost:5001` during development.

---

### ▶️ 4. Running the Application

#### Start the Backend Server

```bash
cd Backend
npm start # or node server.js
```

The backend server should start and be accessible at: [http://localhost:5001](http://localhost:5001)

#### Start the Frontend Development Server

```bash
cd ../Frontend
npm run dev
```

The frontend development server will typically start on: [http://localhost:5173](http://localhost:5173)

---

## 📱 Mobile Development (Capacitor)

To build and test the application on iOS or Android devices:

### Install Capacitor CLI Globally

```bash
npm install -g @capacitor/cli
```

### Initialize Capacitor in your Frontend

From the `Frontend` directory:

```bash
npx cap init "WhisprChat" "com.yourcompany.whisprchat" --web-dir dist
```

> `dist` is common for Vite projects. Verify this in your `vite.config.js` or `package.json`.

### Build Your React App for Production

```bash
npm run build # or yarn build
```

### Copy Web Assets to Capacitor

```bash
npx cap copy
```

### Add Native Platforms

```bash
npx cap add ios
npx cap add android
```

### Open in Native IDEs

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

---

## ☁️ Deployment (Render.com)

This application is designed for easy continuous deployment using platforms like Render.com.

### Steps:

1. **Connect your GitHub Repository**: Link your `Chat-Application` GitHub repository to your Render account.
2. **Configure the App Service**: Create a new "Web Service" on Render.
3. Go to the **Start command** and type:

```bash
npm run build
npm start
```

4. Add your `.env` values from the backend to the Environment Variables section (excluding `NODE_ENV`).
5. **Continuous Deployment**: Render will automatically detect pushes to your GitHub branch and redeploy.

---
