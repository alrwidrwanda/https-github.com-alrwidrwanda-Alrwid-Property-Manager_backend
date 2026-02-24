# Alrwid Property Manager – Backend

Node.js + Express + MongoDB (Mongoose) API with MVC structure, CORS, and error handling.

## 📋 Requirements

- **Node.js** 18+ (or 20+ recommended)
- **MongoDB** running locally or a MongoDB Atlas connection string
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Environment Variables

The `.env` file should already exist. If not, copy from `.env.example`:

```bash
cp .env.example .env
```

**Required environment variables:**

- `PORT` – API port (default: `5000`)
- `MONGODB_URI` – MongoDB connection string
  - Local: `mongodb://localhost:27017/alrwid-property-manager`
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database`
- `NODE_ENV` – Environment mode (`development` or `production`)
- `CLIENT_ORIGIN` – (Optional) Comma-separated frontend URLs for CORS
  - Example: `http://localhost:5173` or `http://localhost:5173,http://localhost:3000`
  - If omitted, all origins are allowed (useful for local development)

### 3. Run the Server

**Development mode** (with auto-restart on file changes):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start at **http://localhost:5000** (or the `PORT` specified in `.env`).

You should see:
```
✓ MongoDB connected: [host]
  Database: [database-name]

✓ Server running in development mode
  URL: http://localhost:5000
  Health: http://localhost:5000/api/health
```

## 📡 API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health status |

### Users API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Items API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Create a new item |
| GET | `/api/items/:id` | Get item by ID |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

## 📝 Example API Requests

### Create a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Create a Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Widget",
    "description": "A useful widget",
    "price": 29.99,
    "inStock": true
  }'
```

### Create an Item

```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "quantity": 10,
    "category": "Electronics",
    "inStock": true
  }'
```

### Get All Users

```bash
curl http://localhost:5000/api/users
```

### Update a User

```bash
curl -X PUT http://localhost:5000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "role": "admin"
  }'
```

### Delete a Product

```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID
```

## 🔗 Frontend Connection

1. **Set API Base URL** in your frontend to: `http://localhost:5000` (or your configured `PORT`)

2. **CORS Configuration:**
   - CORS is enabled by default
   - Set `CLIENT_ORIGIN` in `.env` to restrict allowed origins in production
   - Multiple origins can be comma-separated: `http://localhost:5173,http://localhost:3000`

3. **Example Frontend API Call:**

```javascript
// Fetch all users
const response = await fetch('http://localhost:5000/api/users');
const data = await response.json();
console.log(data); // { success: true, count: 5, data: [...] }

// Create a user
const newUser = await fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});
```

## 🏗️ Project Structure (MVC Pattern)

```
backend/
├── config/
│   ├── db.js          # MongoDB connection configuration
│   └── env.js         # Environment variables validation
├── controllers/
│   ├── userController.js    # User business logic
│   ├── productController.js # Product business logic
│   └── itemController.js    # Item business logic
├── middleware/
│   ├── errorHandler.js      # Global error handling middleware
│   ├── notFound.js          # 404 handler middleware
│   └── validateObjectId.js  # MongoDB ObjectId validation
├── models/
│   ├── User.js       # User Mongoose schema
│   ├── Product.js    # Product Mongoose schema
│   └── Item.js       # Item Mongoose schema
├── routes/
│   ├── userRoutes.js    # User API routes
│   ├── productRoutes.js # Product API routes
│   └── itemRoutes.js    # Item API routes
├── app.js            # Express app configuration
├── server.js         # Server entry point
├── .env              # Environment variables (not in git)
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## 🎯 Features

- ✅ **MVC Architecture** – Clean separation of concerns
- ✅ **RESTful API** – Standard CRUD operations
- ✅ **MongoDB Integration** – Mongoose ODM with connection handling
- ✅ **Error Handling** – Comprehensive error middleware
- ✅ **CORS Support** – Configurable cross-origin resource sharing
- ✅ **Input Validation** – Mongoose schema validation + ObjectId validation
- ✅ **Environment Variables** – Secure configuration management
- ✅ **Consistent Responses** – Standardized JSON response format
- ✅ **Health Check** – Server status endpoint

## 🔧 Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "count": 10  // For list endpoints
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify your `MONGODB_URI` is correct in `.env`
- Check if MongoDB is running (if using local instance)
- For Atlas: Ensure your IP is whitelisted and credentials are correct

### Port Already in Use

- Change `PORT` in `.env` to a different port (e.g., `5001`)
- Or stop the process using port 5000

### CORS Errors

- Ensure `CLIENT_ORIGIN` in `.env` matches your frontend URL exactly
- Check for trailing slashes or protocol mismatches (http vs https)

## 📦 Dependencies

- **express** – Web framework
- **mongoose** – MongoDB object modeling
- **cors** – Cross-origin resource sharing
- **dotenv** – Environment variable management

## 📄 License

ISC
