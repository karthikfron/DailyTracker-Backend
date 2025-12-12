# Daily Tracker Backend – Authentication API

A production-style backend built with **Node.js, Express, SQLite, JWT, bcrypt**, and a clean **MVC architecture**.  
This API provides a complete authentication system with access tokens, refresh tokens, protected routes, security middleware, rate limiting, and structured documentation.

---

## 🚀 Features

### **Authentication**
- Secure **signup & login** with bcrypt hashing  
- **JWT access tokens** (1-hour expiry)  
- **Refresh token rotation** (7-day validity)  
- Token renewal: `/auth/token`  
- **Logout** with refresh-token invalidation  
- Role column prepared for admin/user separation  

---

### 🔐 Security
- Added **Helmet** for secure HTTP headers  
- **Global rate limiting** (100 req/min/IP)  
- **Login brute-force protection** (5 attempts/min)  
- Passwords stored with bcrypt hashing  
- Planned: Zod validation, CORS rules  

---

## 🧱 Architecture (MVC)


- **controllers/** — business logic  
- **models/** — DB queries  
- **middleware/** — JWT, validation, rate limiters  
- **routes/** — API endpoints  
- **utils/** — helpers (token creation)  
- **db/** — SQLite initialization  
- **docs/** — Swagger/OpenAPI docs  

---

## 📡 API Endpoints

### **Auth Routes**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/auth/signup` | Register a new user |
| POST   | `/auth/login`  | Authenticate user & generate tokens |
| POST   | `/auth/token`  | Refresh access token |
| POST   | `/auth/logout` | Invalidate refresh token |

### **User Routes**
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | `/user/profile`  | Get authenticated user details (JWT required) |

---

## 🛢️ Database Schema

id INTEGER PRIMARY KEY
name TEXT
email TEXT UNIQUE
password TEXT
refreshToken TEXT
role TEXT DEFAULT 'user'

Database file: `dailytracker.db`  
Driver: SQLite (persistent local DB)

---

## 📘 Swagger API Documentation

Swagger UI available at:

http://localhost:5000/api-docs



Generated using:

- `swagger-ui-express`
- `swagger-jsdoc`

Docs stored inside `/docs`.

---

## 🧪 Testing

All routes validated using Thunder Client:

- Signup  
- Login  
- Token renewal  
- Logout  
- JWT-protected profile  
- 429 responses for rate limiting  
- Helmet security headers verified  

---

## 📦 Installation

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/daily-tracker-backend.git
cd daily-tracker-backend

```
**2. Install dependencies**
```bash

npm install
```

**3. Create a .env file**
```bash
JWT_SECRET=your-secret-key
```

**4. Start the server**
```bash
node server.js
```


Server runs at:
```bash

http://localhost:5000
```