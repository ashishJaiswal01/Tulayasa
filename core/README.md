# Core Backend Structure

This directory contains the core backend server code organized in a scalable, modular structure that makes it easy to add new services.

## 📁 Directory Structure

```
core/
├── config/              # Configuration files
│   └── server.js       # Server and environment configuration
├── db/                 # Database utilities
│   └── connection.js   # Database connection and helpers
└── src/
    ├── controllers/    # Request handlers (business logic)
    │   └── reviewController.js
    ├── routes/         # Express route definitions
    │   ├── index.js    # Main route aggregator
    │   └── reviews.js  # Review service routes
    └── middleware/     # Custom Express middleware
        ├── logger.js   # Request/error logging
        └── errorHandler.js  # Error handling
```

## 🚀 Adding a New Service

To add a new service (e.g., `users`, `programs`, `treatments`), follow these steps:

### 1. Create Controller

Create a new controller file in `src/controllers/`:

```javascript
// src/controllers/userController.js
import { getSupabaseClient } from '../../db/connection.js';

export async function getUsers(req, res) {
  try {
    const client = getSupabaseClient();
    const response = await fetch(
      `${client.url}/rest/v1/users?select=*`,
      { headers: client.headers }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUser(req, res) {
  // Implementation
}
```

### 2. Create Routes

Create a new route file in `src/routes/`:

```javascript
// src/routes/users.js
import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
```

### 3. Register Routes

Add your new routes to `src/routes/index.js`:

```javascript
import userRoutes from './users.js';

router.use('/users', userRoutes);
```

That's it! Your new service is now available at `/api/users`.

## 📝 Best Practices

1. **Controllers**: Keep controllers focused on request/response handling. Move complex business logic to a `services/` folder if needed.

2. **Routes**: Keep routes simple - they should only define endpoints and call controllers.

3. **Error Handling**: Use try-catch in controllers and let the error handler middleware handle responses.

4. **Validation**: Add input validation in controllers before processing requests.

5. **Database**: Use the `getSupabaseClient()` helper from `db/connection.js` for database operations.

## 🔧 Configuration

All configuration is centralized in `config/server.js`. Add new configuration values there and import them where needed.

## 🗄️ Database

Database utilities are in `db/connection.js`:
- `testDb()` - Test database connectivity
- `query(sql, params)` - Execute raw SQL queries
- `getSupabaseClient()` - Get Supabase client configuration

## 🛡️ Middleware

- **Request Logger**: Automatically logs all incoming requests
- **Error Handler**: Centralized error handling and response formatting
- **404 Handler**: Handles undefined routes

## 📚 Example: Complete Service Implementation

```javascript
// src/controllers/programController.js
import { getSupabaseClient } from '../../db/connection.js';

export async function getPrograms(req, res) {
  try {
    const client = getSupabaseClient();
    const response = await fetch(
      `${client.url}/rest/v1/programs?select=*`,
      { headers: client.headers }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// src/routes/programs.js
import express from 'express';
import { getPrograms } from '../controllers/programController.js';

const router = express.Router();
router.get('/', getPrograms);
export default router;

// src/routes/index.js (add this line)
import programRoutes from './programs.js';
router.use('/programs', programRoutes);
```
