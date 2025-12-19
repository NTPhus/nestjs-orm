import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserSchema } from './dto/create-user.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { UserInterceptor } from '../../interceptors/user.interceptor';
import { UserDecorator } from '../../decorators/user.decorator';
import { User } from './entities/user.entity';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UsersService) { }

  @Post("register")
  @UsePipes(new ZodValidationPipe(createUserSchema))
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  async login(@Body() loginUser: LoginUser, @Res({ passthrough: true }) response: Response) {
    const token = await this.userService.login(loginUser);
    response.cookie('accessToken', token.accessToken, { httpOnly: true, secure: true, sameSite: "none" });
    response.cookie('refreshToken', token.refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
    return {
      message: "Success"
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    return {
      message: "logout sucess"
    };
  }

  @Get('refresh')
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies['refreshToken'];
    const data = await this.userService.refreshToken(refreshToken);
    if(!data) throw Error();
    response.cookie('accessToken', data.accessToken, { httpOnly: true, secure: true, sameSite: "none" });
    response.cookie('refreshToken', data.refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
    return data;
  }
}

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @UseInterceptors(UserInterceptor)
  @Get('info')
  get(@UserDecorator() user: User) {
    return this.userService.getUser(user.id);
  }

  @Get('allUser')
  async getAllUsers(){
    return await this.userService.getAllUsers();
  }

  @Get('order')
  async getOrder(@UserDecorator() user: User) {
    const data = this.userService.getOrders(user.id);
    return data;
  }

  @Get("createOrder")
  async createOrder(@UserDecorator() user: User) {
    this.userService.createOrder(user.id);
    return "Success";
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);    
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
