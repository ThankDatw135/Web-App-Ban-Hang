import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { CONFIG } from '../config';

export enum QueueNames {
  NOTIFICATIONS = 'notifications',
  ORDERS = 'orders',
  EMAILS = 'emails',
}

export interface MessagePayload {
  type: string;
  data: any;
  timestamp: Date;
}

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqplib.Connection | null = null;
  private channel: amqplib.Channel | null = null;
  private readonly logger = new Logger(RabbitMQService.name);
  private isConnected = false;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect(): Promise<void> {
    try {
      const url = CONFIG.RABBITMQ?.URL || `amqp://${CONFIG.RABBITMQ?.USER || 'guest'}:${CONFIG.RABBITMQ?.PASSWORD || 'guest'}@${CONFIG.RABBITMQ?.HOST || 'localhost'}:${CONFIG.RABBITMQ?.PORT || 5672}`;
      
      this.connection = await amqplib.connect(url);
      this.channel = await this.connection.createChannel();

      // Setup queues
      await this.setupQueues();

      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.logger.log('Successfully connected to RabbitMQ');

      // Handle connection close
      this.connection.on('close', () => {
        this.logger.warn('RabbitMQ connection closed');
        this.isConnected = false;
        this.handleReconnect();
      });

      this.connection.on('error', (err) => {
        this.logger.error('RabbitMQ connection error:', err.message);
        this.isConnected = false;
      });
    } catch (error) {
      this.logger.warn(`Failed to connect to RabbitMQ: ${error.message}. Running in fallback mode.`);
      this.isConnected = false;
    }
  }

  private async setupQueues(): Promise<void> {
    if (!this.channel) return;

    // Assert all queues
    for (const queueName of Object.values(QueueNames)) {
      await this.channel.assertQueue(queueName, {
        durable: true,
        arguments: {
          'x-message-ttl': 86400000, // 24 hours
        },
      });
      this.logger.log(`Queue "${queueName}" is ready`);
    }
  }

  private async handleReconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.logger.error('Max reconnection attempts reached. Running in fallback mode.');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    this.logger.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    setTimeout(async () => {
      await this.connect();
    }, delay);
  }

  async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }
      this.isConnected = false;
      this.logger.log('Disconnected from RabbitMQ');
    } catch (error) {
      this.logger.error('Error disconnecting from RabbitMQ:', error.message);
    }
  }

  async publish(queue: QueueNames, message: MessagePayload): Promise<boolean> {
    if (!this.isConnected || !this.channel) {
      this.logger.warn(`RabbitMQ not connected. Message to ${queue} will be logged instead.`);
      this.logger.debug(`Fallback message: ${JSON.stringify(message)}`);
      return false;
    }

    try {
      const buffer = Buffer.from(JSON.stringify(message));
      this.channel.sendToQueue(queue, buffer, {
        persistent: true,
        contentType: 'application/json',
      });
      this.logger.debug(`Message published to ${queue}: ${message.type}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to publish message to ${queue}:`, error.message);
      return false;
    }
  }

  async subscribe(queue: QueueNames, callback: (message: MessagePayload) => Promise<void>): Promise<void> {
    if (!this.isConnected || !this.channel) {
      this.logger.warn(`Cannot subscribe to ${queue}: RabbitMQ not connected`);
      return;
    }

    try {
      await this.channel.consume(queue, async (msg) => {
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString()) as MessagePayload;
            await callback(content);
            this.channel?.ack(msg);
          } catch (error) {
            this.logger.error(`Error processing message from ${queue}:`, error.message);
            this.channel?.nack(msg, false, false);
          }
        }
      });
      this.logger.log(`Subscribed to queue: ${queue}`);
    } catch (error) {
      this.logger.error(`Failed to subscribe to ${queue}:`, error.message);
    }
  }

  // Convenience methods for specific queues
  async publishNotification(data: any): Promise<boolean> {
    return this.publish(QueueNames.NOTIFICATIONS, {
      type: 'notification',
      data,
      timestamp: new Date(),
    });
  }

  async publishOrderEvent(type: string, data: any): Promise<boolean> {
    return this.publish(QueueNames.ORDERS, {
      type,
      data,
      timestamp: new Date(),
    });
  }

  async publishEmail(data: { to: string; subject: string; body: string }): Promise<boolean> {
    return this.publish(QueueNames.EMAILS, {
      type: 'email',
      data,
      timestamp: new Date(),
    });
  }

  getConnectionStatus(): { isConnected: boolean; reconnectAttempts: number } {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
    };
  }
}
