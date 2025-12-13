# Daily Tracker – Backend API

A scalable backend API built using **Node.js** and **Express**, focused on clean architecture, authentication, security, and documentation.  
This project was built incrementally with real-world backend practices in mind.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- SQLite
- JWT (Access & Refresh Tokens)
- bcrypt
- Zod (Request validation)
- Swagger (API documentation)
- Helmet (Security headers)
- Express Rate Limit
- Morgan (Request logging)

---

## 📁 Project Structure

```text
src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── validators/
├── utils/
├── db/
├── docs/
└── server.js
```
## 🔐 Authentication Features

- User signup and login  
- Password hashing using bcrypt  
- JWT access token (short-lived)  
- JWT refresh token (long-lived)  
- Token renewal endpoint  
- Logout with refresh token invalidation  
- Protected routes using authentication middleware  

---

## 🛡️ Security & Middleware

- Helmet for securing HTTP headers  
- Rate limiting to prevent brute-force attacks  
- Morgan for HTTP request logging  
- Zod for request body validation  
- Centralized error handling middleware  

---

## 📘 API Documentation

Swagger UI is available at:

```text
/api-docs
```
This provides interactive API documentation for all authentication and user endpoints.
## ⚙️ Environment Variables

Create a .env file in the root directory:
```
JWT_SECRET=your_jwt_secret_here
```
## ▶️ Run Locally

Install dependencies:
```bash
npm install
```


## Start the development server:
```bash
npm run dev
```


The server will be available at:
```
http://localhost:5000
```
