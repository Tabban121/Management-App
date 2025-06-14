# 🚀 Management-App

A full-stack Task Management Application with secure user authentication and CRUD features. Built using **Next.js (Frontend)** and **Express + MongoDB (Backend)**.

---

## 🔐 Features

### 👥 User Authentication
- **Signup/Login/Logout**
- JWT-based secure authentication
- Session handling and protected routes
- Token saved in localStorage for auto-auth headers

### ✅ Task Management
- **Add Task:** Users can add tasks after logging in.
- **Edit Task:** Tasks can be renamed using inline editing.
- **Delete Task:** Tasks can be deleted in one click.
- **Fetch Own Tasks:** Only the tasks of the logged-in user are shown.

### 🧠 Smart UI
- Toast notifications for success/error messages
- Conditional rendering based on login state
- Form validations
- Responsive design using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React Hooks
- Axios (via `apiClient.ts`)
- Tailwind CSS
- React Toastify

### Backend
- Express.js + TypeScript
- MongoDB with Mongoose
- JWT for Authentication
- RESTful API structure

---

