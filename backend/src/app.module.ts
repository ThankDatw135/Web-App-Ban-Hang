import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Config
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import redisConfig from './config/redis.config';
import firebaseConfig from './config/firebase.config';
import rabbitmqConfig from './config/rabbitmq.config';

// Database
import { DatabaseModule } from './database/database.module';

// Integrations
import { RedisModule } from './integrations/redis/redis.module';
import { RabbitmqModule } from './integrations/rabbitmq/rabbitmq.module';
import { StorageModule } from './integrations/storage/storage.module';
import { AiModule } from './integrations/ai/ai.module';

// Feature Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { ActivityModule } from './modules/activity/activity.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, firebaseConfig, rabbitmqConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    DatabaseModule,

    // Integrations
    RedisModule,
    RabbitmqModule,
    StorageModule,
    AiModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    DiscountsModule,
    ActivityModule,
    AdminModule,
  ],
})
export class AppModule {}
