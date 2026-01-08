import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      const host = this.configService.get('rabbitmq.host');
      const port = this.configService.get('rabbitmq.port');
      const username = this.configService.get('rabbitmq.username');
      const password = this.configService.get('rabbitmq.password');
      const vhost = this.configService.get('rabbitmq.vhost');

      const url = `amqp://${username}:${password}@${host}:${port}${vhost}`;
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();

      this.logger.log('RabbitMQ connected successfully');

      // Declare queues
      const queues = this.configService.get('rabbitmq.queues');
      for (const queueName of Object.values(queues)) {
        await this.channel.assertQueue(queueName as string, { durable: true });
      }
    } catch (error) {
      this.logger.error('RabbitMQ connection error:', error);
    }
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  async publish(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      this.logger.error('RabbitMQ channel not initialized');
      return;
    }

    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue(queue, buffer, { persistent: true });
    this.logger.debug(`Message published to queue: ${queue}`);
  }

  async consume(queue: string, callback: (message: any) => Promise<void>): Promise<void> {
    if (!this.channel) {
      this.logger.error('RabbitMQ channel not initialized');
      return;
    }

    await this.channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          await callback(content);
          this.channel.ack(msg);
        } catch (error) {
          this.logger.error(`Error processing message: ${error.message}`);
          this.channel.nack(msg, false, false);
        }
      }
    });
  }
}
