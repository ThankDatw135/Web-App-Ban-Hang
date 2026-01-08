import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private readonly keyPrefix: string;

  constructor(private configService: ConfigService) {
    this.keyPrefix = this.configService.get('redis.keyPrefix') || 'luxury:';
  }

  async onModuleInit() {
    this.client = new Redis({
      host: this.configService.get('redis.host'),
      port: this.configService.get('redis.port'),
      password: this.configService.get('redis.password'),
      db: this.configService.get('redis.db'),
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected successfully');
    });

    this.client.on('error', (error) => {
      this.logger.error('Redis connection error:', error);
    });
  }

  async onModuleDestroy() {
    await this.client?.quit();
  }

  private prefixKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(this.prefixKey(key));
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    const prefixedKey = this.prefixKey(key);

    if (ttlSeconds) {
      await this.client.setex(prefixedKey, ttlSeconds, serialized);
    } else {
      await this.client.set(prefixedKey, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(this.prefixKey(key));
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(this.prefixKey(key));
    return result === 1;
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.client.expire(this.prefixKey(key), ttlSeconds);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(this.prefixKey(pattern));
  }

  async flushByPattern(pattern: string): Promise<void> {
    const keys = await this.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }
}
