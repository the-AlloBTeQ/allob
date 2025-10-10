// lib/rate-limit.ts - Rate limiting for Next.js serverless functions
import type { NextApiResponse } from 'next';

interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval: number;
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, RateLimitData>();

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Cleanup every minute

export function rateLimit(config: RateLimitConfig) {
  return {
    check: async (res: NextApiResponse, limit: number, token: string): Promise<void> => {
      const now = Date.now();
      const key = `${token}:${Math.floor(now / config.interval)}`;
      
      let tokenData = rateLimitStore.get(key);
      
      if (!tokenData) {
        tokenData = {
          count: 0,
          resetTime: now + config.interval
        };
        rateLimitStore.set(key, tokenData);
      }
      
      tokenData.count++;
      
      const remaining = Math.max(0, limit - tokenData.count);
      const resetTime = Math.ceil(tokenData.resetTime / 1000);
      
      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', resetTime);
      
      if (tokenData.count > limit) {
        res.setHeader('Retry-After', Math.ceil(config.interval / 1000));
        throw new Error('Rate limit exceeded');
      }
    }
  };
}

// Advanced rate limiter with different limits for different endpoints
export class AdvancedRateLimiter {
  private store = new Map<string, RateLimitData>();
  private cleanupInterval: number;

  constructor(cleanupInterval = 60000) {
    this.cleanupInterval = cleanupInterval;
    // Cleanup expired entries
    setInterval(() => {
      const now = Date.now();
      for (const [key, data] of this.store.entries()) {
        if (now > data.resetTime) {
          this.store.delete(key);
        }
      }
    }, this.cleanupInterval);
  }
  
  async checkLimit(
    res: NextApiResponse,
    identifier: string,
    limit: number,
    windowMs: number
  ): Promise<boolean> {
    const now = Date.now();
    const windowStart = Math.floor(now / windowMs) * windowMs;
    const key = `${identifier}:${windowStart}`;
    
    let data = this.store.get(key);
    
    if (!data) {
      data = {
        count: 0,
        resetTime: windowStart + windowMs
      };
      this.store.set(key, data);
    }
    
    data.count++;
    
    const remaining = Math.max(0, limit - data.count);
    const resetTime = Math.ceil(data.resetTime / 1000);
    
    // Set headers
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', resetTime);
    
    if (data.count > limit) {
      res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
      return false;
    }
    
    return true;
  }
}

