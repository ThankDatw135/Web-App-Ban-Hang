import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'Luxury Fashion Platform',
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3001'],
  jwtSecret: process.env.JWT_SECRET || 'super-secret-jwt-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
}));
