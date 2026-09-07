import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtPayload } from './interfaces/jwt-payload.interface';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    process.env.EXPIRY_TIME_MS = '5000'; // 5 seconds
    strategy = new JwtStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should throw UnauthorizedException if timestamp is missing', () => {
      const payload: JwtPayload = {
        sub: 1,
        email: 'test@example.com',
      } as unknown as JwtPayload;

      expect(() => strategy.validate(payload)).toThrow(UnauthorizedException);
      expect(() => strategy.validate(payload)).toThrow('Token wygasł');
    });

    it('should throw UnauthorizedException if token expired according to EXPIRY_TIME_MS', () => {
      const payload: JwtPayload = {
        sub: 1,
        email: 'test@example.com',
        timestamp: Date.now() - 6000, // 6 seconds ago (> 5000ms)
      };

      expect(() => strategy.validate(payload)).toThrow(UnauthorizedException);
      expect(() => strategy.validate(payload)).toThrow('Token wygasł');
    });

    it('should return user info if token is valid and not expired', () => {
      const payload: JwtPayload = {
        sub: 1,
        email: 'test@example.com',
        timestamp: Date.now() - 1000, // 1 second ago (< 5000ms)
      };

      const result = strategy.validate(payload);
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });
  });
});
