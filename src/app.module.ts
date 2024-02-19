import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { LoggingMiddleware } from './middleware/request-logging.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggingInterceptor } from './interceptor/response-logging.interceptor';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRE_HOST || 'localhost',
      port: parseInt(process.env.POSTGRE_PORT) || 5432,
      username: process.env.POSTGRE_USER || 'postgres',
      password: process.env.POSTGRE_PASS || '',
      database: process.env.POSTGRE_DB_NAME || 'waizly',
      models: [User],
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseLoggingInterceptor, // Implement Interceptor for logging response need
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Implement Middleware for logging request need
  }
}
