import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '../../generated/prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: {
    user: {
      findUnique: jest.Mock;
      update: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaService = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should throw NotFoundException if user is not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      let error: unknown;
      try {
        await service.findById(999);
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(NotFoundException);
    });

    it('should return user without password', async () => {
      const dbUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.user.findUnique.mockResolvedValue(dbUser);

      const result = await service.findById(1);

      expect(result).not.toHaveProperty('password');
      expect(result.id).toBe(1);
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('update', () => {
    const existingUser = {
      id: 1,
      email: 'old@example.com',
      password: 'oldhashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should throw NotFoundException if user does not exist', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      let error: unknown;
      try {
        await service.update(999, { email: 'new@example.com' });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(NotFoundException);
    });

    it('should throw ConflictException if email is taken by another user', async () => {
      prismaService.user.findUnique
        .mockResolvedValueOnce(existingUser) // check user exists
        .mockResolvedValueOnce({ id: 2, email: 'taken@example.com' }); // findByEmail check

      let error: unknown;
      try {
        await service.update(1, { email: 'taken@example.com' });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(ConflictException);
      expect((error as ConflictException).message).toBe(
        'Użytkownik z tym adresem email już istnieje',
      );
    });

    it('should update email and hash new password, returning user without password', async () => {
      prismaService.user.findUnique
        .mockResolvedValueOnce(existingUser) // check user exists
        .mockResolvedValueOnce(null); // email not taken

      const updatedUser = {
        id: 1,
        email: 'new@example.com',
        password: 'newHashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, {
        email: 'new@example.com',
        password: 'newSecretPassword123',
      });

      const updateCalls = prismaService.user.update.mock.calls as [
        { where: { id: number }; data: { email?: string; password?: string } },
      ][];
      expect(updateCalls[0][0].where).toEqual({ id: 1 });
      expect(updateCalls[0][0].data.email).toBe('new@example.com');
      const calledPassword = updateCalls[0][0].data.password;
      expect(calledPassword).toBeDefined();
      expect(calledPassword).not.toBe('newSecretPassword123');
      const isPasswordHashed = await bcrypt.compare(
        'newSecretPassword123',
        calledPassword!,
      );
      expect(isPasswordHashed).toBe(true);

      expect(result).not.toHaveProperty('password');
      expect(result.email).toBe('new@example.com');
    });

    it('should throw ConflictException if Prisma throws P2002 error', async () => {
      prismaService.user.findUnique
        .mockResolvedValueOnce(existingUser)
        .mockResolvedValueOnce(null);

      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: '7.9.1',
        },
      );
      prismaService.user.update.mockRejectedValue(prismaError);

      let error: unknown;
      try {
        await service.update(1, { email: 'conflict@example.com' });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(ConflictException);
    });
  });
});
