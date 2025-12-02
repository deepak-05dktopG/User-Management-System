# User Management System

A full-stack MERN application for managing users with authentication, role-based access control, and CRUD operations.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user_management
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_ACCESS_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/refresh` | Refresh access token | Public |
| POST | `/api/auth/logout` | Logout user | Private |

### User Routes (Admin Only)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users with filters | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

## Validation Rules

### Registration
- **Name**: Minimum 3 characters, alphabets only
- **Email**: Valid email format, unique
- **Phone**: 10-15 digits, unique
- **Password**: Minimum 6 characters with at least one number
- **Address**: Optional, maximum 150 characters
- **State, City, Country**: Required
- **Pincode**: 4-10 digits
- **Profile Image**: JPG/PNG, max 2MB

## Security Features

- Password hashing with bcrypt
- JWT authentication with access and refresh tokens
- Token expiry and automatic refresh
- Role-based access control
- CORS protection
- Helmet for security headers
- Rate limiting (100 requests per 15 minutes, 5 login attempts per 15 minutes)
- Input validation
- File upload restrictions

## Testing the Application

### Create Admin User

Since this is a new system, you'll need to create an admin user manually in MongoDB:

1. Register a user through the frontend
2. Connect to MongoDB and update the user's role:

```javascript
use user_management
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Default Credentials (After Manual Setup)
- Email: admin@example.com
- Password: (your chosen password or admin123)

<h2>📬 Contact</h2>

<ul>
  <li>✉️ Email: <a href="mailto:kumardeepak59422@gmail.com ">kumardeepak59422@gmail.com</a></li>
  <li>👨‍💼 LinkedIn: <a href="https://www.linkedin.com/in/deepak-05dktopg/" target="_blank">https://www.linkedin.com/in/deepak-05dktopg/</a></li>
</ul>

<hr/>
