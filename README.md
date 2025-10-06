# ✅ CommitList – A To-Do List Project

CommitList is a full-stack task management web application where users can create an account, verify their email, log in, and manage their personal to-do lists.  
Built with **React + TailwindCSS** on the frontend and **Node.js + Express + MongoDB** on the backend, it ensures a smooth and secure experience.

---

## 📖 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
  
---

## 🧐 About

CommitList is designed to help users stay organized and productive.  
With **secure authentication** using JWT and bcrypt, and **email verification** powered by SendGrid, every user gets a private space to manage their tasks efficiently.

---

## ✨ Features

- 👤 **User Authentication**
  - Sign Up & Log In
  - Secure password hashing with bcrypt
  - Email verification with SendGrid

- 📝 **Task Management**
  - Add new tasks
  - Edit existing tasks
  - Delete tasks

- 🔒 **User-specific Data**
  - Each user has their own to-do list
  - Tasks are private and linked to their account

- 🖥️ **Responsive UI**
  - Clean and minimal interface with TailwindCSS
  - Mobile-friendly design

---

## 🧰 Tech Stack

- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** bcrypt + JWT  
- **Email Service:** SendGrid  

---

## 🛠️ Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster or local MongoDB instance

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/CommitList-A-todo-list-project.git

# 2. Navigate into the project folder
cd CommitList-A-todo-list-project

# 3. Install dependencies for backend
cd backend
npm install

# 4. Install dependencies for frontend
cd ../frontend
npm install

# 5. Create a .env file (see Environment Variables section)

# 6. Run backend server
cd ../backend
npm start

# 7. Run frontend
cd ../frontend
npm start
