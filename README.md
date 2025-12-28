# Vellko Lead Management System

A full-stack MERN application for managing users, leads and validation workflows.  
This project includes secure authentication, protected routes, role-based access, and dashboards for managing data efficiently.

---

## 🚀 Features

- 🔐 User Signup & Login (JWT Based Authentication)
- 👤 User Profile Display After Login
- 📧 Email Verification Flow (if enabled)
- 📋 Leads & Sources Management
- ✅ Validate Leads
- 📊 Dashboard View
- 🔒 Private / Protected Routes
- 🚪 Logout Functionality

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios
- Toast Notifications

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cookie Based Auth (if enabled)
- dotenv

---

## 📁 Project Structure (Simple Overview)

project/
│
├── backend/ → Node + Express API
├── frontend/ → React Application
└── README.md


Both folders run independently.

---

# 🏗 Installation & Setup Guide

Follow these steps carefully 👇

---

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>

Then open the folder:
cd project

Setup the Backend (Server)
cd backend
npm install

Create a file named:
.env

Add the following (update values as needed):
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

Start the backend
node server.js

Setup the Frontend (React App)

cd frontend

Install dependencies
npm install

Start the React app
npm run dev

