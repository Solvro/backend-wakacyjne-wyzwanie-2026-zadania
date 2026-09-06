import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should successfully register a user with hashed password and without returning the password', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'plainPassword123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockImplementation(async ({ data }) => ({
        id: 1,
        email: data.email,
        password: data.password,
      }));

      const result = await service.register(dto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(mockPrismaService.user.create).toHaveBeenCalled();
      
      const createdData = mockPrismaService.user.create.mock.calls[0][0].data;
      expect(createdData.email).toBe(dto.email);
      expect(createdData.password).not.toBe(dto.password);
      const isMatch = await bcrypt.compare(dto.password, createdData.password);
      expect(isMatch).toBe(true);

      expect(result).toEqual({ id: 1, email: dto.email });
      expect((result as any).password).toBeUndefined();
    });

    it('should throw ConflictException if user with email already exists', async () => {
      const dto = {
        email: 'existing@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        email: dto.email,
        password: 'hashedpassword',
      });

      await expect(service.register(dto)).rejects.toThrow(
        new ConflictException('Użytkownik z tym adresem email już istnieje'),
      );
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });
});
