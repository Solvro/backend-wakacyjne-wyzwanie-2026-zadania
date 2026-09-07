export interface JwtPayload {
  sub: number;
  email: string;
  timestamp: number;
  iat?: number;
  exp?: number;
}
