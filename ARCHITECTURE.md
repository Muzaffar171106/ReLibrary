# ReLibrary - Architecture Documentation

## Project Overview

ReLibrary is a modern library management system built with **Node.js**, **Express**, and **Prisma**. It provides a comprehensive platform for managing books, user accounts, borrowing records, reviews, and favorites.

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2
- **Database ORM**: Prisma
- **Database**: PostgreSQL

### Authentication & Security
- **Password Hashing**: bcrypt
- **JWT**: jsonwebtoken
- **Security Headers**: helmet
- **CORS**: cors
- **Rate Limiting**: express-rate-limit

### File Management
- **Upload**: multer
- **Cloud Storage**: AWS S3 (via multer-s3)

### Utilities
- **Date/Time**: dayjs
- **Logging**: winston
- **Task Scheduling**: node-cron
- **UUID Generation**: uuid
- **Validation**: joi
- **HTTP Logging**: morgan
- **Compression**: compression
- **Cookie Parsing**: cookie-parser

---

## Folder Structure

```
ReLibrary/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migrations
│
├── src/
│   ├── config/                # Configuration files
│   │   └── (database, AWS, etc.)
│   │
│   ├── constants/             # Application constants
│   │   └── (status codes, messages, etc.)
│   │
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validation.middleware.js
│   │   └── (others)
│   │
│   ├── modules/               # Feature modules (modular architecture)
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.validation.js
│   │   │   └── auth.utils.js
│   │   │
│   │   ├── books/             # Books management module
│   │   │   ├── books.controller.js
│   │   │   ├── books.service.js
│   │   │   ├── books.routes.js
│   │   │   ├── books.validation.js
│   │   │   └── books.query.js
│   │   │
│   │   ├── categories/        # Categories module
│   │   │   ├── categories.controller.js
│   │   │   ├── categories.service.js
│   │   │   ├── categories.routes.js
│   │   │   └── categories.validation.js
│   │   │
│   │   ├── borrows/           # Borrowing management module
│   │   │   ├── borrows.controller.js
│   │   │   ├── borrows.service.js
│   │   │   ├── borrows.routes.js
│   │   │   └── borrows.validation.js
│   │   │
│   │   ├── favorites/         # Favorites module
│   │   │   ├── favorites.controller.js
│   │   │   ├── favorites.service.js
│   │   │   └── favorites.routes.js
│   │   │
│   │   ├── reviews/           # Reviews module
│   │   │   ├── reviews.controller.js
│   │   │   ├── reviews.service.js
│   │   │   └── reviews.routes.js
│   │   │
│   │   └── users/             # Users management module
│   │       ├── users.controller.js
│   │       ├── users.service.js
│   │       ├── users.routes.js
│   │       └── users.validation.js
│   │
│   ├── routes/                # Main route aggregation
│   │   └── index.js
│   │
│   ├── services/              # Shared business logic services
│   │   └── (email, file upload, etc.)
│   │
│   ├── utils/                 # Utility functions
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── logger.js
│   │
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
│
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
└── README.md                  # Project documentation
```

---

## Architecture Pattern: Modular Architecture

The project follows a **modular architecture** pattern, where each feature is organized as a self-contained module.

### Module Structure

Each module (e.g., `auth`, `books`, `categories`) follows this pattern:

```
module/
├── {module}.controller.js     # HTTP request handlers
├── {module}.service.js        # Business logic & database operations
├── {module}.routes.js         # Route definitions
├── {module}.validation.js     # Request validation middleware
└── {module}.utils.js          # Module-specific utilities (optional)
```

### Separation of Concerns

- **Controller**: Handles HTTP requests/responses
- **Service**: Contains business logic and database operations
- **Routes**: Defines API endpoints and middleware application
- **Validation**: Request data validation
- **Utils**: Helper functions specific to the module

---

## Data Flow

### Request Flow

```
Client Request
    ↓
Express Middleware (CORS, compression, logging)
    ↓
Rate Limiting Middleware
    ↓
Route Handler (routes.js)
    ↓
Validation Middleware (validation.js)
    ↓
Controller (controller.js)
    ↓
Service Layer (service.js)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Response ← (back through the chain)
```

### Example: Create Book Flow

1. **Client** sends POST request to `/api/books`
2. **Route Handler** receives request
3. **Validation Middleware** validates request body
4. **Controller** receives validated data
5. **Service** performs business logic:
   - Check if ISBN exists
   - Create book in database
   - Update category count
6. **Prisma** executes SQL query
7. **Database** creates book record
8. **Response** returns to client

---

## Core Modules

### 1. Auth Module
**Purpose**: User authentication and authorization
- Register new users
- Login with JWT tokens
- Profile management
- Password changes
- Token verification

**Key Features**:
- Bcrypt password hashing
- JWT token generation
- Token expiration

### 2. Books Module
**Purpose**: Book catalog management
- List all books with pagination
- Search and filter books
- Create/update/delete books
- Get popular and new books
- Book statistics

**Key Features**:
- Advanced filtering (category, search)
- Sorting options
- Pagination support
- Book availability tracking

### 3. Categories Module
**Purpose**: Book categorization
- Create/update/delete categories
- List categories
- Get books in category
- Category search

**Key Features**:
- Prevents deletion of categories with books
- Category book counting
- Search support

### 4. Borrows Module
**Purpose**: Book borrowing management
- Borrow books
- Return books
- Extend borrowing period
- Track overdue books
- Availability management

**Key Features**:
- Overdue book prevention
- Automatic quantity updates
- Extend functionality
- Overdue tracking

### 5. Favorites Module
**Purpose**: User favorite books management
- Add/remove favorites
- List user favorites
- Check if book is favorite
- Favorite count

**Key Features**:
- Pagination support
- Duplicate prevention
- Quick favorite status check

### 6. Reviews Module
**Purpose**: Book reviews and ratings
- Create reviews with ratings
- Update/delete reviews
- Get book average rating
- User review history

**Key Features**:
- Rating validation (1-5)
- Duplicate review prevention
- Book borrow requirement
- Average rating calculation

### 7. Users Module
**Purpose**: User management
- Get user profile
- Update user information
- Delete user account
- User statistics

---

## Database Model Relationships

```
User
├── has many → Borrow
├── has many → Review
├── has many → Favorite
└── has many → Profile

Book
├── belongs to → Category
├── has many → Borrow
├── has many → Review
└── has many → Favorite

Category
└── has many → Book

Borrow
├── belongs to → User
└── belongs to → Book

Review
├── belongs to → User
└── belongs to → Book

Favorite
├── belongs to → User
└── belongs to → Book
```

---

## Key Features

### 1. Authentication & Authorization
- JWT-based authentication
- Secure password hashing with bcrypt
- Token expiration management

### 2. Book Management
- Complete CRUD operations
- Advanced search and filtering
- Category organization
- Availability tracking

### 3. Borrowing System
- Book borrowing and returning
- Overdue tracking
- Borrow extension
- Quantity management

### 4. User Reviews
- Rating system (1-5)
- Book reviews with comments
- Average rating calculation
- Review modification and deletion

### 5. Favorites System
- Add/remove from favorites
- View user favorites
- Quick favorite status check

### 6. Pagination & Filtering
- Paginated responses
- Search functionality
- Filter by category, status, rating
- Sorting options

---

## API Endpoints Overview

### Auth Routes
```
POST   /api/auth/register           # Register new user
POST   /api/auth/login              # User login
POST   /api/auth/logout             # User logout
GET    /api/auth/profile            # Get user profile
PUT    /api/auth/profile            # Update profile
PUT    /api/auth/change-password    # Change password
```

### Books Routes
```
GET    /api/books                   # Get all books
GET    /api/books/popular           # Get popular books
GET    /api/books/new               # Get new books
POST   /api/books/search            # Search books
GET    /api/books/:id               # Get book by ID
POST   /api/books                   # Create book (admin)
PUT    /api/books/:id               # Update book (admin)
DELETE /api/books/:id               # Delete book (admin)
```

### Categories Routes
```
GET    /api/categories              # Get all categories
GET    /api/categories/:id          # Get category by ID
GET    /api/categories/:id/books    # Get books in category
POST   /api/categories              # Create category (admin)
PUT    /api/categories/:id          # Update category (admin)
DELETE /api/categories/:id          # Delete category (admin)
```

### Borrows Routes
```
GET    /api/borrows                 # Get all borrows
GET    /api/borrows/overdue         # Get overdue borrows
POST   /api/borrows                 # Borrow a book
GET    /api/borrows/:id             # Get borrow by ID
PUT    /api/borrows/:id/return      # Return a book
PUT    /api/borrows/:id/extend      # Extend borrow period
GET    /api/borrows/user/:userId    # Get user's borrows
GET    /api/borrows/book/:bookId    # Get book's borrows history
```

### Favorites Routes
```
GET    /api/favorites/user/:userId               # Get user favorites
GET    /api/favorites/user/:userId/count         # Get favorite count
GET    /api/favorites/check                      # Check if favorite
POST   /api/favorites                            # Add to favorites
DELETE /api/favorites                            # Remove from favorites
DELETE /api/favorites/user/:userId/clear         # Clear all favorites
```

### Reviews Routes
```
GET    /api/reviews                              # Get all reviews
GET    /api/reviews/top                          # Get top reviews
POST   /api/reviews                              # Create review
GET    /api/reviews/:id                          # Get review by ID
PUT    /api/reviews/:id                          # Update review
DELETE /api/reviews/:id                          # Delete review
GET    /api/reviews/book/:bookId                 # Get book reviews
GET    /api/reviews/book/:bookId/average         # Get average rating
GET    /api/reviews/user/:userId                 # Get user reviews
```

---

## Middleware Stack

```
Express App
├── helmet                     # Security headers
├── compression                # Response compression
├── morgan                     # HTTP logging
├── CORS                       # Cross-origin requests
├── body parser                # JSON parsing
├── cookie-parser              # Cookie parsing
├── Rate Limiting              # Request throttling
├── Custom Auth Middleware     # JWT verification
├── Custom Error Middleware    # Error handling
└── Routes
```

---

## Error Handling

The application uses a centralized error handling middleware that:

1. Catches errors from all routes
2. Validates error status codes
3. Returns consistent error responses
4. Logs errors using Winston

**Error Response Format**:
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-05-19T10:30:00Z"
}
```

---

## Security Features

1. **Authentication**: JWT-based token authentication
2. **Password Security**: bcrypt hashing with salt rounds
3. **Request Validation**: Joi schema validation
4. **Rate Limiting**: Prevent abuse with request throttling
5. **Security Headers**: Helmet.js for HTTP headers
6. **CORS**: Cross-origin resource sharing control
7. **Compression**: Response compression to reduce bandwidth
8. **Input Sanitization**: Validation on all inputs

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/relibrary

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_BUCKET_NAME=your-bucket
AWS_REGION=us-east-1
```

---

## Development Workflow

### Setup
```bash
npm install
npx prisma generate
npx prisma migrate dev
```

### Development
```bash
npm run dev              # Start with nodemon
```

### Production
```bash
npm start               # Start server
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations
```

---

## Scalability Considerations

1. **Database**: PostgreSQL handles large datasets efficiently
2. **Caching**: Can add Redis for frequently accessed data
3. **Pagination**: Built-in for all list endpoints
4. **Rate Limiting**: Prevents abuse and ensures stability
5. **Logging**: Winston logs for monitoring and debugging
6. **Task Scheduling**: node-cron for background tasks
7. **File Storage**: AWS S3 for scalable file storage

---

## Future Enhancements

- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] User recommendations engine
- [ ] Admin dashboard
- [ ] Book reservations
- [ ] Late fees system
- [ ] Book tags and advanced filtering
- [ ] User roles (Admin, Librarian, Member)
- [ ] API documentation with Swagger
- [ ] Unit and integration tests

---

## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| @prisma/client | ^6.6.0 | Database ORM |
| bcrypt | ^6.0.0 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| joi | ^18.2.1 | Data validation |
| helmet | ^8.1.0 | Security headers |
| morgan | ^1.10.1 | HTTP logging |
| winston | ^3.19.0 | Application logging |
| multer | ^2.1.1 | File upload |
| multer-s3 | ^3.0.1 | S3 integration |
| aws-sdk | ^2.1693.0 | AWS services |
| node-cron | ^4.2.1 | Task scheduling |
| dayjs | ^1.11.20 | Date manipulation |

---

**Architecture Document Version**: 1.0  
**Last Updated**: May 2026  
**Project**: ReLibrary v1.0.0
