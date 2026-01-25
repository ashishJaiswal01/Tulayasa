# Testing Guide - Review Service

This guide explains how to test the review service in both production (Cloudflare Worker) and local development environments.

## 🎯 Quick Test Commands

### Production (Cloudflare Worker)

**Base URL:** `https://royal-flower-caaf.jais-ashish.workers.dev`

#### 1. Health Check
```bash
curl https://royal-flower-caaf.jais-ashish.workers.dev/health
```

**Expected Response:**
```json
{
  "status": "UP",
  "service": "review-service"
}
```

#### 2. Get All Published Reviews
```bash
curl https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "review": "Great service!",
    "rating": 5,
    "status": "PUBLISHED",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 3. Get Single Review by ID
```bash
curl https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews/1
```

#### 4. Create a New Review
```bash
curl -X POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "review": "Excellent experience! Highly recommend.",
    "rating": 5
  }'
```

**Expected Response:**
```json
[
  {
    "id": 2,
    "name": "Jane Smith",
    "review": "Excellent experience! Highly recommend.",
    "rating": 5,
    "status": "PENDING",
    "created_at": "2024-01-24T14:00:00.000Z"
  }
]
```

### Local Development (Express.js Server)

**Base URL:** `http://localhost:3001`

#### 1. Start the Server
```bash
# From root directory
node server.js
```

You should see:
```
✅ Connected to Supabase PostgreSQL
🚀 Server running on port 3001
📡 API available at http://localhost:3001/api
🏥 Health check at http://localhost:3001/health
```

#### 2. Health Check
```bash
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "UP",
  "service": "tulayasa-api",
  "timestamp": "2024-01-24T14:00:00.000Z"
}
```

#### 3. Get All Published Reviews
```bash
curl http://localhost:3001/api/reviews
```

#### 4. Get Single Review by ID
```bash
curl http://localhost:3001/api/reviews/1
```

#### 5. Create a New Review
```bash
curl -X POST http://localhost:3001/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "review": "This is a test review",
    "rating": 4
  }'
```

## 🧪 Testing Scenarios

### Test Case 1: Valid Review Creation
```bash
curl -X POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "review": "Amazing service! Very satisfied.",
    "rating": 5
  }'
```

**Expected:** Status 201, returns created review object

### Test Case 2: Invalid Rating (should fail)
```bash
curl -X POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Wilson",
    "review": "Test review",
    "rating": 6
  }'
```

**Expected:** Status 400, error message about rating validation

### Test Case 3: Missing Required Fields
```bash
curl -X POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Charlie Brown"
  }'
```

**Expected:** Status 400, error about missing required fields

### Test Case 4: Get Non-Existent Review
```bash
curl https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews/99999
```

**Expected:** Status 404, "Review not found" error

## 🌐 Browser Testing

### Using Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Run these commands:

```javascript
// Test fetching reviews
fetch('https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews')
  .then(res => res.json())
  .then(data => console.log('Reviews:', data))
  .catch(err => console.error('Error:', err));

// Test creating a review
fetch('https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Browser Test User',
    review: 'Testing from browser console',
    rating: 5
  })
})
  .then(res => res.json())
  .then(data => console.log('Created:', data))
  .catch(err => console.error('Error:', err));
```

## 🧩 Frontend Integration Testing

### Test from React App

1. Start the frontend:
```bash
cd web-ui
npm run dev
```

2. Open `http://localhost:5173` in your browser

3. Navigate to the reviews section

4. Test the review submission form:
   - Fill in name, review, and rating
   - Submit the form
   - Verify the review appears in the list

5. Check browser console (F12) for any errors

## 📊 Testing Checklist

### API Endpoints
- [ ] Health check returns 200 OK
- [ ] GET /api/reviews returns list of reviews
- [ ] GET /api/reviews/:id returns single review
- [ ] POST /api/reviews creates new review successfully
- [ ] POST /api/reviews validates required fields
- [ ] POST /api/reviews validates rating range (1-5)
- [ ] GET /api/reviews/:id returns 404 for non-existent ID

### Error Handling
- [ ] Missing fields return 400 error
- [ ] Invalid rating returns 400 error
- [ ] Non-existent review returns 404 error
- [ ] Database errors return 500 error with message

### CORS
- [ ] API accepts requests from frontend domain
- [ ] Preflight OPTIONS requests work correctly

## 🔧 Troubleshooting Tests

### Issue: Connection Refused
**Solution:** Make sure the server is running
```bash
# Check if server is running
lsof -ti:3001

# Start server if not running
node server.js
```

### Issue: CORS Errors
**Solution:** Verify CORS is enabled in server.js
- Check that `app.use(cors())` is present

### Issue: Database Connection Failed
**Solution:** Verify environment variables
```bash
# Check .env file exists and has correct values
cat .env
```

### Issue: 404 Not Found
**Solution:** Verify the endpoint URL is correct
- Production: `https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews`
- Local: `http://localhost:3001/api/reviews`

## 📝 Test Data Examples

### Sample Review 1
```json
{
  "name": "Sarah Connor",
  "review": "Outstanding service! The team was professional and helpful.",
  "rating": 5
}
```

### Sample Review 2
```json
{
  "name": "Mike Johnson",
  "review": "Good experience overall, but could be improved.",
  "rating": 3
}
```

### Sample Review 3
```json
{
  "name": "Emily Davis",
  "review": "Not satisfied with the service quality.",
  "rating": 2
}
```

## 🚀 Automated Testing (Optional)

### Using Postman

1. Import these endpoints into Postman:
   - GET `https://royal-flower-caaf.jais-ashish.workers.dev/health`
   - GET `https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews`
   - GET `https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews/:id`
   - POST `https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews`

2. Create a Postman Collection with test cases

3. Run the collection to test all endpoints

### Using HTTPie (Alternative to curl)

```bash
# Install HTTPie
brew install httpie  # macOS
# or
pip install httpie   # Python

# Test endpoints
http GET https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews
http POST https://royal-flower-caaf.jais-ashish.workers.dev/api/reviews name="Test User" review="Test review" rating:=5
```

## ✅ Success Criteria

A successful test should:
1. Return appropriate HTTP status codes (200, 201, 400, 404, 500)
2. Return valid JSON responses
3. Handle errors gracefully with error messages
4. Respect CORS policies
5. Validate input data correctly
6. Connect to database successfully

---

**Need Help?** Check the main [README.md](./README.md) for more information about the project structure and deployment.
