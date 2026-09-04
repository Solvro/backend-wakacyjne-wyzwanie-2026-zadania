import { Request } from 'express';
import { AuthenticatedUser } from '../auth/jwt.strategy';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    findAll(request: Request & {
        user: AuthenticatedUser;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        expenses: {
            id: number;
            tripId: number;
            cost: number;
            description: string | null;
            date: Date;
            participantId: number;
        }[];
        trip: {
            destination: string;
            startDate: Date;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.TripStatus;
            id: number;
            userId: number | null;
        };
    } & {
        id: number;
        name: string;
        tripId: number;
    })[]>;
    create(request: Request & {
        user: AuthenticatedUser;
    }, createParticipantDto: CreateParticipantDto): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
    findOne(request: Request & {
        user: AuthenticatedUser;
    }, id: number): Promise<{
        expenses: {
            id: number;
            tripId: number;
            cost: number;
            description: string | null;
            date: Date;
            participantId: number;
        }[];
        trip: {
            destination: string;
            startDate: Date;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.TripStatus;
            id: number;
            userId: number | null;
        };
    } & {
        id: number;
        name: string;
        tripId: number;
    }>;
    update(request: Request & {
        user: AuthenticatedUser;
    }, id: number, updateParticipantDto: UpdateParticipantDto): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
    remove(request: Request & {
        user: AuthenticatedUser;
    }, id: number): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
}
