import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./user.service";
import { AuthController, UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import { RefreshToken } from "./entities/refresh-token.entity";
import { Orders } from "./entities/orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Orders]), JwtModule.register({
    secret: 'secret1',
    signOptions: {expiresIn: '3h'}
  })],
  controllers: [UserController, AuthController],
  providers: [UsersService],
})
export class UserModule {}