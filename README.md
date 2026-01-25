# Tulayasa

A digital natural lifestyle movement platform focused on wellness, featuring user reviews, authentication, and comprehensive wellness programs.

## 🌿 Overview

Tulayasa is a modern web application that promotes natural wellness and lifestyle. The platform provides information about treatments, wellness programs, and allows users to share their experiences through reviews.

## ✨ Features

- **User Authentication**: Secure signup and login using Supabase
- **Review System**: Users can submit and view reviews with ratings
- **Wellness Programs**: Information about various wellness programs
- **Treatment Information**: Details about treatments offered
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Real-time Database**: PostgreSQL database hosted on Supabase

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Supabase Client** - Authentication and database client

### Backend
- **Express.js** - Web server framework (located in `core/` folder)
- **Node.js** - Runtime environment
- **PostgreSQL** - Database (via Supabase)
- **CORS** - Cross-origin resource sharing

The backend uses a modular structure in the `core/` folder, making it easy to add new services. All API routes are organized under `core/src/routes/` and controllers under `core/src/controllers/`.

### Infrastructure
- **Supabase** - Backend as a Service (Database & Auth)
- **Cloudflare Workers** - Review service API (Production: `royal-flower-caaf.jais-ashish.workers.dev`)
- **Express.js Server** - Backend API server (Local development)
- **GitHub Pages** - Frontend deployment

## 📁 Project Structure

```
Tulayasa/
├── core/                          # Core backend services
│   ├── config/                    # Configuration files
│   │   └── server.js              # Server configuration
│   ├── db/                        # Database utilities
│   │   └── connection.js         # Database connection and helpers
│   ├── src/                       # Source code
│   │   ├── controllers/           # Request handlers (business logic)
│   │   │   ├── reviewController.js
│   │   │   └── .example.controller.js  # Template for new services
│   │   ├── routes/                # Express route definitions
│   │   │   ├── index.js           # Main route aggregator
│   │   │   ├── reviews.js         # Review service routes
│   │   │   └── .example.routes.js # Template for new routes
│   │   └── middleware/            # Custom Express middleware
│   │       ├── logger.js          # Request/error logging
│   │       └── errorHandler.js    # Error handling
│   └── README.md                  # Core backend documentation
│
├── web-ui/                        # Frontend React application
│   ├── src/
│   │   ├── api/                   # API client functions
│   │   │   └── reviewsApi.js
│   │   ├── auth/                  # Authentication API
│   │   │   └── authApi.js
│   │   ├── pages/                 # Page components
│   │   │   ├── login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx                # Main application component
│   │   ├── main.jsx               # Application entry point
│   │   ├── supabaseClient.js      # Supabase client configuration
│   │   └── index.css              # Global styles
│   ├── dist/                      # Production build output
│   ├── package.json               # Frontend dependencies and scripts
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── db/
│   └── init.sql                   # Database schema initialization
│
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment workflow
│
├── server.js                      # Express.js server entry point
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/) (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/ashishJaiswal01/Tulayasa.git
cd Tulayasa
```

### Step 2: Install Dependencies

Install frontend dependencies (backend dependencies are included):

```bash
cd web-ui
npm install
cd ..
```

### Step 3: Set Up Environment Variables

#### Root `.env` File

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following configuration:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here  # Optional, defaults to ANON_KEY

# Server Configuration
SERVER_PORT=3001
NODE_ENV=development
```

**How to get Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**

#### Frontend `.env` File

Create a `.env` file in the `web-ui/` directory:

```bash
cd web-ui
touch .env
```

Add the following:

```env
# Supabase Configuration (for Vite)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# API Configuration (optional - defaults to Cloudflare Worker in production)
# For local development, set to: http://localhost:3001/api/reviews
# For production, uses: https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews
VITE_API_URL=https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews
```

> **Note:** 
> - Vite requires the `VITE_` prefix for environment variables to be exposed to the client.
> - `VITE_API_URL` is optional. If not set, the frontend will use the Cloudflare Worker URL by default.
> - For local development, set `VITE_API_URL=http://localhost:3001/api/reviews` to use the local Express server.

### Step 4: Set Up the Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL script from `db/init.sql`:

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Note:** If you want to use the `status` field (PENDING/PUBLISHED) as used in the controller, add it to the table:

```sql
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
```

## 🏃 Running the Application

### Development Mode

Run backend and frontend in separate terminals:

**Terminal 1 - Backend Server:**
```bash
# From root directory
node server.js
```

The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend Development Server:**
```bash
cd web-ui
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port)

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **API Base**: http://localhost:3001/api

## 📝 Available Commands

### Backend Commands (Root Directory)

```bash
# Start the Express.js server
node server.js

# Check server syntax
node --check server.js
```

### Frontend Commands (`web-ui/`)

```bash
cd web-ui

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 API Endpoints

### Base URL
- **Development**: `http://localhost:3001` (local Express server)
- **Production**: `https://royal-flower-caaf.jais-ashish.workers.dev` (Cloudflare Worker)

### Available Endpoints

#### Reviews Service (Cloudflare Worker)

**Production URL:** `https://royal-flower-caaf.jais-ashish.workers.dev`

- `GET /api/reviews` - Get all published reviews
  ```bash
  # Production
  curl https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews
  
  # Local development
  curl http://localhost:3001/api/reviews
  ```

- `GET /api/reviews/:id` - Get a single review by ID
  ```bash
  # Production
  curl https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews/1
  
  # Local development
  curl http://localhost:3001/api/reviews/1
  ```

- `POST /api/reviews` - Create a new review
  ```bash
  # Production
  curl -X POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","review":"Great service!","rating":5}'
  
  # Local development
  curl -X POST http://localhost:3001/api/reviews \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","review":"Great service!","rating":5}'
  ```

#### Health Check
- `GET /health` - Server health status
  ```bash
  # Production (Cloudflare Worker)
  curl https://royal-flower-caaf.jais-ashish.workers.dev/health
  
  # Local development
  curl http://localhost:3001/health
  ```

### Response Format

**Success Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "review": "Great service!",
  "rating": 5,
  "status": "PENDING",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Error message here",
  "message": "Detailed error message"
}
```

## 🗄️ Database Schema

### Reviews Table

As defined in `db/init.sql`:

```sql
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` - Auto-incrementing primary key
- `name` - Reviewer's name
- `review` - Review text content
- `rating` - Rating from 1 to 5
- `created_at` - Timestamp of creation

**Note:** The controller code uses a `status` field. If you want to use it, add:
```sql
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'PENDING';
```

## 🚢 Deployment

### Frontend Deployment (GitHub Pages)

The frontend is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

#### Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

#### Manual Deployment

```bash
cd web-ui
npm run build
npm run deploy
```

#### GitHub Pages Configuration

1. Go to your repository **Settings**
2. Navigate to **Pages**
3. Ensure **Source** is set to **GitHub Actions**
4. The site will be available at: `https://yourusername.github.io/Tulayasa/`

### Backend Deployment

#### Review Service (Currently Deployed on Cloudflare Workers)

**Production URL:** `https://royal-flower-caaf.jais-ashish.workers.dev`

The review service is currently deployed on **Cloudflare Workers**. The frontend is configured to use this URL by default.

**Cloudflare Worker Endpoints:**
- `GET https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews` - Get all published reviews
- `POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews` - Create a new review
- `GET https://royal-flower-caaf.jais-ashish.workers.dev/health` - Health check

**To update the Cloudflare Worker:**
1. Navigate to the Cloudflare Workers dashboard
2. Update the worker code
3. Deploy the changes

#### Local Express.js Server (Development)

For local development, you can run the Express.js server. Set these environment variables:

```env
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_KEY=your_production_service_key
SERVER_PORT=3001
NODE_ENV=development
```

To use the local server instead of Cloudflare Worker, set in `web-ui/.env`:
```env
VITE_API_URL=http://localhost:3001/api/reviews
```

**Deployment Options for Express.js Server:**
- **Railway**: Connect GitHub repo, add env vars, deploy
- **Render**: Create Web Service, connect repo, set start command: `node server.js`
- **Heroku**: Use Heroku CLI to deploy
- **DigitalOcean**: Use App Platform

## 🔒 Environment Variables Reference

### Root `.env` (Backend)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SUPABASE_URL` | Your Supabase project URL | Yes | - |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes | - |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | No | Uses ANON_KEY |
| `SERVER_PORT` | Port for Express server | No | 3001 |
| `NODE_ENV` | Environment mode | No | development |

### `web-ui/.env` (Frontend)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes | - |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | - |

> **Important:** Never commit `.env` files to version control. They are already in `.gitignore`.

## 🧩 Adding New Services

The backend is structured to easily add new services. See [core/README.md](./core/README.md) for detailed instructions.

### Quick Guide

1. **Create Controller**: `core/src/controllers/[service]Controller.js`
2. **Create Routes**: `core/src/routes/[service].js`
3. **Register Routes**: Add to `core/src/routes/index.js`

Example templates are available:
- `core/src/controllers/.example.controller.js`
- `core/src/routes/.example.routes.js`

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3001`

**Solution:**
```bash
# Find and kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Or change the port in .env
SERVER_PORT=3002
```

#### 2. Database Connection Failed

**Error:** `Failed to connect to database`

**Solution:**
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env`
- Check if your Supabase project is active
- Verify network connectivity

#### 3. Frontend Can't Connect to Backend

**Error:** CORS errors or connection refused

**Solution:**
- Ensure backend is running on the correct port
- Check `VITE_SUPABASE_URL` in `web-ui/.env`
- Verify CORS is enabled in `server.js`

#### 4. Module Not Found Errors

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Install missing dependencies in web-ui (they're shared)
cd web-ui
npm install
```

#### 5. Build Errors

**Error:** Vite build fails

**Solution:**
```bash
# Clear cache and rebuild
cd web-ui
rm -rf node_modules dist
npm install
npm run build
```

## 🧪 Testing

### Quick Test Commands

#### Production (Cloudflare Worker)

```bash
# Health check
curl https://royal-flower-caaf.jais-ashish.workers.dev/health

# Get all reviews
curl https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews

# Create a review
curl -X POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","review":"Test review","rating":5}'
```

#### Local Development

```bash
# Start server first
node server.js

# Then test (in another terminal)
curl http://localhost:3001/health
curl http://localhost:3001/api/reviews

# Create a review
curl -X POST http://localhost:3001/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","review":"Test review","rating":5}'
```

### Comprehensive Testing Guide

For detailed testing instructions, test cases, and troubleshooting, see [TESTING.md](./TESTING.md).

### Frontend Testing

1. Start the frontend:
   ```bash
   cd web-ui
   npm run dev
   ```

2. Open `http://localhost:5173` in your browser

3. Test the review functionality:
   - Navigate to the reviews section
   - Submit a new review
   - Verify it appears in the list

4. Check browser console (F12) for any errors

## 📚 Additional Resources

- [Core Backend Documentation](./core/README.md) - Detailed backend structure guide
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open a Pull Request**

### Code Style

- Use ES6+ JavaScript features
- Follow existing code structure
- Add comments for complex logic
- Keep functions focused and small

## 📄 License

This project is licensed under the ISC License.

## 🐛 Issues

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](https://github.com/ashishJaiswal01/Tulayasa/issues)
3. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)

## 📧 Support

For questions or support:
- Open an issue on [GitHub](https://github.com/ashishJaiswal01/Tulayasa/issues)
- Check the documentation in `core/README.md`

---

**Tulayasa** - Embracing Natural Wellness 🌿
