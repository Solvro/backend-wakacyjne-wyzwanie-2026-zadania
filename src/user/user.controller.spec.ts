import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticatedRequest, UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: {
    findById: jest.Mock;
    update: jest.Mock;
  };

  beforeEach(async () => {
    userService = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should call userService.findById with authenticated user id', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userService.findById.mockResolvedValue(mockUser);

      const req = {
        user: { id: 1, email: 'test@example.com' },
      } as unknown as AuthenticatedRequest;

      const result = await controller.getProfile(req);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateProfile', () => {
    it('should call userService.update with authenticated user id and dto', async () => {
      const dto: UpdateUserDto = {
        email: 'updated@example.com',
      };
      const mockUpdatedUser = {
        id: 1,
        email: 'updated@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userService.update.mockResolvedValue(mockUpdatedUser);

      const req = {
        user: { id: 1, email: 'test@example.com' },
      } as unknown as AuthenticatedRequest;

      const result = await controller.updateProfile(req, dto);

      expect(userService.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
