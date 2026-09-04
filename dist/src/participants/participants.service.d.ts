import { DatabaseService } from '../prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findAll(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    create(userId: number, createParticipantDto: CreateParticipantDto): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
    findOne(userId: number, id: number): Promise<{
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
    update(userId: number, id: number, updateParticipantDto: UpdateParticipantDto): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
    remove(userId: number, id: number): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
    private findTrip;
}
