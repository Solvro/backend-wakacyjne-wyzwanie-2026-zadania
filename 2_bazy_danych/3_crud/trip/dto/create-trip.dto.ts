import { Status } from '@prisma/client';

export class CreateTripDto {
    destination!: string;
    start_date!: Date;
    end_date!: Date;
    status!: Status;
}
