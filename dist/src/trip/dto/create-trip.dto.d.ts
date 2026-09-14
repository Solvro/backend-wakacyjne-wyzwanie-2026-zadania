import { TripStatus } from '@prisma/client';
export declare class CreateTripDto {
    name: string;
    status: TripStatus;
    startDate: string;
}
