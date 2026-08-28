import { TripStatus } from '@prisma/client';
export declare class CreateTripDto {
    destination: string;
    startDate: string;
    endDate?: string;
    status?: TripStatus;
}
