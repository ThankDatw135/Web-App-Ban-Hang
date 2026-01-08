import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  host: process.env.RABBITMQ_HOST || 'localhost',
  port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
  username: process.env.RABBITMQ_USERNAME || 'guest',
  password: process.env.RABBITMQ_PASSWORD || 'guest',
  vhost: process.env.RABBITMQ_VHOST || '/',
  queues: {
    email: 'email_queue',
    notification: 'notification_queue',
    aiProcessing: 'ai_processing_queue',
    orderProcessing: 'order_processing_queue',
  },
}));
