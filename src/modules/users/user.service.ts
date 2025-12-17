import { logger } from 'src/logs/logger';
import { RefreshToken } from './entities/refresh-token.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EntityManager, MoreThan, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { LoginUser } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from 'uuid';
import { Orders } from './entities/orders.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    @InjectRepository(RefreshToken) private readonly RefreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const name = createUserDto.name;
    const email = createUserDto.email;
    const password = await bcrypt.hash(createUserDto.password, 12);
    const user = new User({
      name, email, password
    });
    await this.entityManager.save(user);
    return 'This action adds a new User';
  }

  async login(loginUser: LoginUser) {
    const user = await this.userRepository.findOne({
      where: { email: loginUser.email }
    });

    if (!user) throw new BadRequestException('invalid credentials');

    if (!await bcrypt.compare(loginUser.password, user.password)) throw new BadRequestException('invalid credentials');

    return this.generateUserToken(user.id);
  }

  async generateUserToken(userId: number) {
    const accessToken = await this.jwtService.signAsync({ id: userId });
    const refreshToken = uuidv4()
    await this.storeRefreshToken(userId, refreshToken);
    return {
      accessToken,
      refreshToken
    };
  }

  async storeRefreshToken(userId: number, token: string) {
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 3);
    const refreshToken = new RefreshToken({ userId, token, expiredAt });
    await this.entityManager.save(refreshToken)
  }

  async refreshToken(token: string) {
    const refreshToken = await this.RefreshTokenRepository.findOneBy({ token: token })
    if (!refreshToken) throw new UnauthorizedException();
    await this.RefreshTokenRepository.remove(refreshToken);
    return await this.generateUserToken(refreshToken.userId);
  }

  async getUser(userId: number) {
    logger.info('GET /hello');

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException();
    // const { password, ...result } = user;

    return user;
  }

  async getOrders(userId: number) {

    const orders = await this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.orders", "orders")
      .where("user.id = :id", { id: userId })
      .getMany()
    return orders;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      user.email = updateUserDto.email
      user.password = updateUserDto.password
      await this.entityManager.save(user);
    }

    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return `This action removes a #${id} item`;
  }

  async createOrder(userId: number) {
    const newOrder = new Orders({
      userId: userId,
      total_amount: 1500
    })
    await this.entityManager.save(newOrder);
  }
}
