import { Test } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UsersService } from "./user.service";
import { JwtAuthGuard } from "../../guards/auth.guard";
import { User } from "./entities/user.entity";

describe('UserController', () => {
    let userController: UserController;
    let userService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        getAllUsers: jest.fn(),
                        getUser: jest.fn()
                    },
                },
            ],
        }).overrideGuard(JwtAuthGuard) // Tìm JwtAuthGuard
            .useValue({ canActivate: () => true }) // Cho nó luôn trả về true
            .compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UsersService>(UsersService);
    });

    describe('getAllUsers', () => {
        it('should return any user', async () => {
            const result = [{ id: 1, username: 'A', email: 'A@gmail.com' }];

            jest.spyOn(userService, 'getAllUsers').mockResolvedValue(result as any);

            const response = await userController.getAllUsers();

            expect(response).toEqual(result);
            expect(userService.getAllUsers).toHaveBeenCalled();
        });
    });

    describe('getUser', () => {
        it('should return any info of user', async () => {
            const result = [{ id: 1, username: 'A', email: 'A@gmail.com' }];

            jest.spyOn(userService, 'getUser').mockResolvedValue(result as any);

            const response = await userController.get(new User({ id: 1, name: "A", email: "A@gmail.com" }));

            expect(response).toEqual(result);
            expect(userService.getUser).toHaveBeenCalled();
        });
    });
});