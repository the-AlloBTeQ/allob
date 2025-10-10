import type { NextApiResponse } from 'next';

// lib/cors.ts - CORS configuration
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400', // 24 hours
};

export const setCorsHeaders = (res: NextApiResponse): void => {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};

export const handleCorsPreflightRequest = (res: NextApiResponse): void => {
  setCorsHeaders(res);
  res.status(200).end();
};

// CORS middleware function
export const withCors = (handler: any) => {
  return async (req: any, res: NextApiResponse) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    return handler(req, res);
  };
};

// IP extraction utility
export const getClientIP = (req: any): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  
  if (forwarded) {
    return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded[0];
  }
  if (realIP) {
    return typeof realIP === 'string' ? realIP : realIP[0];
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown';
};

// Security headers
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'",
};

export const setSecurityHeaders = (res: NextApiResponse): void => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};