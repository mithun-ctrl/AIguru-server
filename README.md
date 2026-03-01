# VidyaAI – Classroom Assessment Platform (Backend)

The complete production-ready backend for the **VidyaAI** Classroom Assessment Platform. This RESTful API allows teachers to create and manage dynamic multiple-choice tests, and allows students to take those tests, submitting their answers for automatic grading using a secure, JWT-authenticated role-based system.

## 🚀 Key Features

- **Role-Based Access Control (RBAC):** Distinct `teacher` and `student` roles securely manage who can create content and who can consume it.
- **JWT Authentication:** Secure user registration and login using JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Automated Assessment:** When students submit a test, the server immediately calculates their score based on the test's correct answers natively.
- **MVC Architecture:** Clean, modular codebase separating Models, Views (Routes), and Controllers.
- **MongoDB & Mongoose:** Fully integrated NoSQL database for flexible data schemas representing Users, Tests, Questions, and Results.

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** jsonwebtoken (JWT)
- **Security:** bcryptjs, cors

## 📁 Folder Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection logic
├── controllers/
│   ├── authController.js     # Register, login, profile logic
│   ├── resultController.js   # Test submission and result fetching
│   └── testController.js     # Test creation and fetching logic
├── middleware/
│   ├── authMiddleware.js     # JWT validation
│   └── roleMiddleware.js     # Role verification (Teacher vs Student)
├── models/
│   ├── Result.js             # Mongoose schema for student results
│   ├── Test.js               # Mongoose schema for tests
│   └── User.js               # Mongoose schema for users
├── routes/
│   ├── authRoutes.js
│   ├── resultRoutes.js
│   └── testRoutes.js
├── .env                      # Environment variables
├── package.json
└── server.js                 # Application entry point
```

## ⚙️ Local Setup & Execution

1.  **Clone the repository and enter the directory.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:** Create a `.env` file in the root directory and configure the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_super_secret_key
    ```
4.  **Start the server:**
    - Development mode (with auto-reload via nodemon):
      ```bash
      npm run dev
      ```
    - Production mode:
      ```bash
      npm start
      ```

## 📡 API Endpoints Reference

### Authentication Route (`/api/auth`)

| Method | Endpoint    | Description                                               | Access        |
| :----- | :---------- | :-------------------------------------------------------- | :------------ |
| `POST` | `/register` | Register a new user (`name`, `email`, `password`, `role`) | Public        |
| `POST` | `/login`    | Authenticate user and get JWT                             | Public        |
| `GET`  | `/me`       | Get currently logged-in user profile                      | **Protected** |

### Test Routes (`/api/tests`)

| Method   | Endpoint | Description                  | Access                     |
| :------- | :------- | :--------------------------- | :------------------------- |
| `POST`   | `/`      | Create a new test            | **Teacher Only**           |
| `GET`    | `/`      | Get all available tests      | **Protected**              |
| `GET`    | `/:id`   | Get details of a single test | **Protected**              |
| `DELETE` | `/:id`   | Delete a single test         | **Teacher Only** (Creator) |

### Result Routes (`/api/results`)

| Method | Endpoint        | Description                                             | Access                     |
| :----- | :-------------- | :------------------------------------------------------ | :------------------------- |
| `POST` | `/submit`       | Submit a test array and calculate score automatically   | **Student Only**           |
| `GET`  | `/student`      | Get all tests attempted by the logged-in student        | **Student Only**           |
| `GET`  | `/test/:testId` | View all student submissions/scores for a specific test | **Teacher Only** (Creator) |

## 🧪 Testing with Postman

1. **Register** a `teacher` and a `student` via `/api/auth/register.`
2. Pass the returned `token` in the **Authorization** header as a **Bearer Token** for any subsequent protected requests.
3. Login as the teacher, POST a test to `/api/tests`.
4. Login as the student, GET the test, and POST an answer payload to `/api/results/submit`.
