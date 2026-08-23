import { TripCategory } from '@prisma/client';

export class UpdateTripDto {
  title?: string;
  category?: TripCategory;
  startDate?: string;
  endDate?: string;
  description?: string;
}
