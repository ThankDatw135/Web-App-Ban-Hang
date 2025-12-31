import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rabbitMQService: RabbitMQService,
  ) {}

  async findAll(firebaseUid: string) {
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notifications = await this.notificationsRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    const unreadCount = await this.notificationsRepository.count({
      where: { userId: user.id, read: false },
    });

    return {
      data: {
        notifications,
        unreadCount,
      },
    };
  }

  async markAsRead(firebaseUid: string, notificationId: string) {
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, userId: user.id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read = true;
    await this.notificationsRepository.save(notification);

    return {
      message: 'Notification marked as read',
    };
  }

  async markAllAsRead(firebaseUid: string) {
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.notificationsRepository.update(
      { userId: user.id, read: false },
      { read: true },
    );

    return {
      message: 'All notifications marked as read',
    };
  }

  async create(userId: string, data: { title: string; body: string; type?: string; data?: any }) {
    const notification = this.notificationsRepository.create({
      userId,
      title: data.title,
      body: data.body,
      type: data.type || 'general',
      data: data.data,
    });

    await this.notificationsRepository.save(notification);

    // Publish notification to RabbitMQ for async processing
    try {
      await this.rabbitMQService.publishNotification({
        notificationId: notification.id,
        userId,
        title: data.title,
        body: data.body,
        type: data.type || 'general',
      });
      this.logger.debug(`Notification ${notification.id} published to RabbitMQ`);
    } catch (error) {
      // Log error but don't fail the operation - notification is already saved
      this.logger.warn(`Failed to publish notification to RabbitMQ: ${error.message}`);
    }

    return notification;
  }

  async delete(firebaseUid: string, notificationId: string) {
    const user = await this.usersRepository.findOne({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notification = await this.notificationsRepository.findOne({
      where: { id: notificationId, userId: user.id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationsRepository.remove(notification);

    return {
      message: 'Notification deleted',
    };
  }

  // Method to send notification to user
  async sendNotificationToUser(userId: string, title: string, body: string, type?: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.create(userId, { title, body, type });
  }

  // Method to broadcast notification to all users
  async broadcastNotification(title: string, body: string, type?: string) {
    const users = await this.usersRepository.find();
    const notifications = [];

    for (const user of users) {
      const notification = await this.create(user.id, { title, body, type: type || 'broadcast' });
      notifications.push(notification);
    }

    return {
      message: `Notification sent to ${notifications.length} users`,
      count: notifications.length,
    };
  }
}
