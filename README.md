# 🚗 AutoVault - Car Dealership Inventory Management System

AutoVault is a full-stack Car Dealership Inventory Management System developed as part of a Test-Driven Development (TDD) assessment. The application enables customers to browse and purchase vehicles while allowing administrators to securely manage inventory through role-based access control.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role-Based Authorization (Customer & Admin)

---

## Customer Features

- Browse all available vehicles
- Search vehicles by:
  - Make
  - Category
  - Price Range
- Purchase available vehicles
- Automatic inventory quantity update after purchase

---

## Admin Features

- Add new vehicles
- Update existing vehicle details
- Delete vehicles
- Restock vehicle inventory
- Protected Admin Dashboard
- Admin-only API endpoints

---

## Vehicle Management

Each vehicle contains:

- Make
- Model
- Category
- Year
- Price
- Quantity Available

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs

## Testing

- Jest
- Supertest

---

# Project Structure

```
car-dealership/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tests/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── PROMPTS.md
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/suparsh-21/car-dealership.git

cd car-dealership
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

ADMIN_EMAIL=admin@autovault.com
ADMIN_PASSWORD=Admin@12345

SECOND_ADMIN_EMAIL=admin@dealership.com
SECOND_ADMIN_PASSWORD=admin123
```

Start Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Default Admin Accounts

The application automatically seeds the following administrator accounts.

## Admin Account 1

Email

```
admin@autovault.com
```

Password

```
Admin@12345
```

---

## Admin Account 2

Email

```
admin@dealership.com
```

Password

```
admin123
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Vehicle Management

| Method | Endpoint |
|---------|----------|
| GET | /api/vehicles |
| GET | /api/vehicles/search |
| POST | /api/vehicles |
| PUT | /api/vehicles/:id |
| DELETE | /api/vehicles/:id |

---

## Inventory

| Method | Endpoint |
|---------|----------|
| POST | /api/vehicles/:id/purchase |
| POST | /api/vehicles/:id/restock |

---

# Running Tests

Run all backend tests using:

```bash
npm test
```

## Test Report

```
PASS src/tests/auth.test.js

PASS src/tests/vehicle.test.js

PASS src/tests/inventory.test.js

Test Suites: 3 passed, 3 total

Tests: 28 passed, 28 total

Snapshots: 0 total
```





# AI Usage

Artificial Intelligence tools were used during development for:

- Brainstorming project architecture
- Debugging issues
- Understanding concepts
- Improving API design
- Documentation assistance
- README preparation
- Test improvements
- UI suggestions

All AI-generated suggestions were manually reviewed, modified, tested, and integrated before being included in the final submission.

---

# PROMPTS.md

The repository contains a **PROMPTS.md** file documenting the prompts used during development in accordance with the assessment requirements.

---

# Live Demo

Frontend

```
https://YOUR_FRONTEND_DEPLOYMENT_URL
```

Backend

```
https://YOUR_BACKEND_DEPLOYMENT_URL
```

---

# GitHub Repository

```
https://github.com/suparsh-21/car-dealership
```

---

# Author

**Suparsh Pandita**

---

# License

This project was developed for educational and assessment purposes only.