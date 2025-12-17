import { UserModule } from './modules/users/user.module';
import { ItemsModule } from './modules/items/items.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, DatabaseModule, ItemsModule, UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes("*")
  }
}
