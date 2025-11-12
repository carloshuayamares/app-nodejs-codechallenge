import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Transaction } from './entities/transaction.entity';
import { TransactionType } from './entities/transaction-type.entity';
import { TransactionStatus } from './entities/transaction-status.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'), // configService.get posible cambio
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'wallet_challenge'),
        entities: [Transaction, TransactionType, TransactionStatus], // posible cambio
        synchronize: true, // configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Transaction, TransactionType, TransactionStatus]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
