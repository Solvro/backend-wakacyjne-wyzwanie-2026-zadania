import { TripCategory } from '@prisma/client';

export class CreateTripDto {
  title: string;
  category?: TripCategory;
  startDate: string; // ISO date string
  endDate?: string;
  description?: string;
}
