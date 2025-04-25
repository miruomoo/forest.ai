import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Initialize Supabase admin client
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware to verify authentication
const requireAuth: RequestHandler = (req, res, next) => {
  const sessionToken = req.cookies.session;
  
  if (!sessionToken) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  
  supabaseAdmin.auth.getUser(sessionToken)
    .then(({ data, error }) => {
      if (error || !data.user) {
        res.status(401).json({ error: 'Invalid session' });
        return;
      }
      
      req.user = data.user;
      next();
    })
    .catch((error) => {
      console.error('Auth error:', error);
      res.status(401).json({ error: 'Authentication failed' });
    });
};

// Basic health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Protected route example
app.get('/api/user/profile', requireAuth, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

// Refresh token endpoint
app.post('/api/auth/refresh', (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    res.status(401).json({ error: 'No refresh token' });
    return;
  }
  
  supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken })
    .then(({ data, error }) => {
      if (error) throw error;
      
      if (!data.session) {
        res.status(401).json({ error: 'No session data available' });
        return;
      }
      
      res.cookie('session', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
      
      res.cookie('refreshToken', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 90 * 24 * 60 * 60 * 1000
      });
      
      res.json({ user: data.user });
    })
    .catch((error) => {
      console.error('Refresh error:', error);
      res.status(401).json({ error: 'Failed to refresh session' });
    });
});

// Start server
app.listen(port, () => {
  console.log(`forest.ai server is running on port ${port}`);
});

