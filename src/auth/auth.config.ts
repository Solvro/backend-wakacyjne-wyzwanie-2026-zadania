export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

export function getExpiryTimeMs(): number {
  const expiryTimeMs = Number(process.env.EXPIRY_TIME_MS);
  if (!Number.isFinite(expiryTimeMs) || expiryTimeMs <= 0) {
    throw new Error(
      'EXPIRY_TIME_MS environment variable must be set to a positive number',
    );
  }
  return expiryTimeMs;
}
