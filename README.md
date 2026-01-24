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
- **Express.js** - Web server framework
- **Node.js** - Runtime environment
- **PostgreSQL** - Database (via Supabase)
- **CORS** - Cross-origin resource sharing

### Infrastructure
- **Supabase** - Backend as a Service (Database & Auth)
- **Cloudflare Workers** - Serverless functions (optional)
- **GitHub Pages** - Frontend deployment

## 📁 Complete Project Structure

```
Tulayasa/
├── core/                          # Core backend services (renamed from review-worker)
│   ├── config/
│   │   └── server.js              # Server configuration
│   ├── db/
│   │   └── connection.js         # Database connection utilities
│   ├── src/
│   │   ├── controllers/           # Request handlers (business logic)
│   │   │   ├── reviewController.js
│   │   │   └── .example.controller.js  # Template for new services
│   │   ├── routes/                # Express route definitions
│   │   ├── index.js             # Main route aggregator (register all services here)
│   │   ├── reviews.js             # Review service routes
│   │   └── .example.routes.js     # Template for new routes
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
│   ├── public/                    # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── review-worker/                 # Cloudflare Worker (legacy/optional)
│   └── royal-flower-caaf/         # Worker project
│       ├── src/
│       │   ├── Controllers/
│       │   ├── routes/
│       │   └── index.ts
│       └── package.json
│
├── db/
│   └── init.sql                   # Database schema initialization
│
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions deployment workflow
│
├── server.js                      # Express.js server entry point
├── certs/                         # SSL certificates (if any)
├── public/                        # Root public assets
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/) (free tier available)
- **(Optional) Cloudflare Account** - For worker deployment

### Step 1: Clone the Repository

```bash
git clone https://github.com/ashishJaiswal01/Tulayasa.git
cd Tulayasa
```

### Step 2: Install Dependencies

#### Install Root Dependencies

The root directory uses dependencies from `web-ui/package.json`. Install them:

```bash
# Install web-ui dependencies
cd web-ui
npm install
cd ..
```

#### Install Backend Dependencies

The backend uses the same dependencies. If you need to install Express and other backend packages at root level:

```bash
npm install express cors dotenv
```

### Step 3: Set Up Environment Variables

#### Root `.env` File

Create a `.env` file in the root directory:

```bash
# Create .env file
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
```

> **Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

### Step 4: Set Up the Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the following SQL script (or use `db/init.sql`):

```sql
-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Backend and Frontend Separately (Recommended)

**Terminal 1 - Backend Server:**
```bash
# From root directory
node server.js
# or
npm run server  # if script exists in package.json
```

The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend Development Server:**
```bash
cd web-ui
npm run dev
```

The frontend will start on `http://localhost:5173` (default Vite port)

#### Option 2: Using npm scripts (if configured)

```bash
# Start backend
npm run server

# In another terminal, start frontend
cd web-ui && npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **API Base**: http://localhost:3001/api

## 📝 Available Commands

### Root Level Commands

```bash
# Start the Express.js server
node server.js
# or
npm run server  # if configured

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

### Backend Commands

The backend doesn't have a separate package.json. All commands are run from the root:

```bash
# Start server
node server.js

# Check for syntax errors
node --check server.js
```

### Cloudflare Worker Commands (Optional)

```bash
cd review-worker/royal-flower-caaf

# Start worker in development mode
npm run dev

# Deploy worker to Cloudflare
npm run deploy

# Run tests
npm test
```

## 🌐 API Endpoints

### Base URL
- **Development**: `http://localhost:3001`
- **Production**: `https://your-domain.com`

### Available Endpoints

#### Reviews Service
- `GET /api/reviews` - Get all published reviews
  ```bash
  curl http://localhost:3001/api/reviews
  ```

- `GET /api/reviews/:id` - Get a single review by ID
  ```bash
  curl http://localhost:3001/api/reviews/1
  ```

- `POST /api/reviews` - Create a new review
  ```bash
  curl -X POST http://localhost:3001/api/reviews \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","review":"Great service!","rating":5}'
  ```

#### Health Check
- `GET /health` - Server health status
  ```bash
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

```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` - Auto-incrementing primary key
- `name` - Reviewer's name
- `review` - Review text content
- `rating` - Rating from 1 to 5
- `status` - Review status (PENDING, PUBLISHED, REJECTED)
- `created_at` - Timestamp of creation

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

The Express.js server can be deployed to various platforms:

#### Option 1: Railway

1. Sign up at [Railway](https://railway.app/)
2. Create a new project
3. Connect your GitHub repository
4. Add environment variables in Railway dashboard
5. Deploy!

#### Option 2: Render

1. Sign up at [Render](https://render.com/)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Set build command: (leave empty or `npm install`)
5. Set start command: `node server.js`
6. Add environment variables
7. Deploy!

#### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login

# Create Heroku app
heroku create tulayasa-api

# Set environment variables
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_ANON_KEY=your_key
heroku config:set SERVER_PORT=3001

# Deploy
git push heroku main
```

#### Option 4: DigitalOcean App Platform

1. Create a new app on DigitalOcean
2. Connect your GitHub repository
3. Configure build and run commands
4. Add environment variables
5. Deploy!

#### Environment Variables for Production

Make sure to set these in your hosting platform:

```env
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_KEY=your_production_service_key
SERVER_PORT=3001
NODE_ENV=production
```

### Cloudflare Worker Deployment (Optional)

```bash
cd review-worker/royal-flower-caaf

# Configure wrangler.jsonc with your Cloudflare account ID
# Then deploy
npm run deploy
```

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
# Install missing dependencies
npm install express cors dotenv

# Or reinstall all dependencies
cd web-ui && npm install
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

### Manual Testing

1. **Test Backend Health:**
   ```bash
   curl http://localhost:3001/health
   ```

2. **Test API Endpoints:**
   ```bash
   # Get reviews
   curl http://localhost:3001/api/reviews
   
   # Create review
   curl -X POST http://localhost:3001/api/reviews \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","review":"Test review","rating":5}'
   ```

### Frontend Testing

Open the browser console and check for errors when:
- Loading the page
- Submitting forms
- Making API calls

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

*Last updated: 2024*
