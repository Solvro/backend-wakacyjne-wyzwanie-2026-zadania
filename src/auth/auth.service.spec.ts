import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '../../generated/prisma/client';

import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: {
    findByEmail: jest.Mock;
    create: jest.Mock;
  };
  let jwtService: {
    sign: jest.Mock;
    verifyAsync: jest.Mock;
  };

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
      verifyAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should throw ConflictException if user already exists', async () => {
      userService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.register(registerDto)).rejects.toThrow(
        'Użytkownik z tym adresem email już istnieje',
      );
      expect(userService.create).not.toHaveBeenCalled();
    });

    it('should hash password and create new user, returning user without password', async () => {
      userService.findByEmail.mockResolvedValue(null);
      const createdUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPasswordFromBcrypt',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userService.create.mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(userService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(userService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
        }),
      );

      const createCalls = userService.create.mock.calls as [
        { email: string; password: string },
      ][];
      const calledHashedPassword = createCalls[0][0].password;
      expect(calledHashedPassword).not.toBe('password123');
      const isPasswordValid = await bcrypt.compare(
        'password123',
        calledHashedPassword,
      );
      expect(isPasswordValid).toBe(true);

      expect(result).not.toHaveProperty('password');
      expect(result.id).toBe(1);
      expect(result.email).toBe('test@example.com');
    });

    it('should throw ConflictException if Prisma throws P2002', async () => {
      userService.findByEmail.mockResolvedValue(null);
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: '7.9.1',
        },
      );
      userService.create.mockRejectedValue(prismaError);

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(service.login(loginDto)).rejects.toThrow(
        'Nieprawidłowy email lub hasło',
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const hashedPassword = await bcrypt.hash('different-password', 10);
      userService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
      });

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(service.login(loginDto)).rejects.toThrow(
        'Nieprawidłowy email lub hasło',
      );
    });

    it('should return JWT token on successful login with payload containing sub, email, and timestamp', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      userService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
      });
      jwtService.sign.mockReturnValue('mocked.jwt.token');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        access_token: 'mocked.jwt.token',
        token: 'mocked.jwt.token',
      });
      const signCalls = jwtService.sign.mock.calls as [
        { sub: number; email: string; timestamp: number },
      ][];
      expect(signCalls[0][0].sub).toBe(1);
      expect(signCalls[0][0].email).toBe('test@example.com');
      expect(typeof signCalls[0][0].timestamp).toBe('number');
    });
  });

  describe('verifyToken', () => {
    it('should throw UnauthorizedException when jwt verification fails', async () => {
      jwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      let error: unknown;
      try {
        await service.verifyToken('bad.token');
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).message).toBe(
        'Nieprawidłowy token',
      );
    });

    it('should throw UnauthorizedException if token expired according to EXPIRY_TIME_MS', async () => {
      process.env.EXPIRY_TIME_MS = '1000'; // 1 second
      jwtService.verifyAsync.mockResolvedValue({
        sub: 1,
        email: 'test@example.com',
        timestamp: Date.now() - 5000, // 5 seconds ago
      });

      let error: unknown;
      try {
        await service.verifyToken('expired.token');
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect((error as UnauthorizedException).message).toBe('Token wygasł');
    });

    it('should return payload if token is within EXPIRY_TIME_MS', async () => {
      process.env.EXPIRY_TIME_MS = '60000'; // 60 seconds
      const now = Date.now();
      const payload = {
        sub: 1,
        email: 'test@example.com',
        timestamp: now,
      };
      jwtService.verifyAsync.mockResolvedValue(payload);

      const result = await service.verifyToken('valid.token');
      expect(result).toEqual(payload);
    });
  });
});
