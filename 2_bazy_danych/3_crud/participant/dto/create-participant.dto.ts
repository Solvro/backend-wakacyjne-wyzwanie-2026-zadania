import { Role } from "@prisma/client";

export class CreateParticipantDto {
    trip_id!: number;
    name!: string;
    email?: string;
    role!: Role;
}
