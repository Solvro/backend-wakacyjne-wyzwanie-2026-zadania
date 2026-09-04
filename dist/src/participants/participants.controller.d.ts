import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
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
        };
    } & {
        id: number;
        name: string;
        tripId: number;
    })[]>;
    create(createParticipantDto: CreateParticipantDto): import("@prisma/client").Prisma.Prisma__ParticipantClient<{
        id: number;
        name: string;
        tripId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(id: number): Promise<{
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
        };
    } & {
        id: number;
        name: string;
        tripId: number;
    }>;
    update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        tripId: number;
    }>;
}
