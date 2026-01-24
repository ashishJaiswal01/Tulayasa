/**
 * Request logging middleware
 * Logs all incoming requests with method, URL, and body
 */
export function requestLogger(req, res, next) {
  console.log('➡️', req.method, req.url, req.body ? JSON.stringify(req.body) : '');
  next();
}

/**
 * Error logging middleware
 */
export function errorLogger(err, req, res, next) {
  console.error('❌ Error:', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }
  next(err);
}
