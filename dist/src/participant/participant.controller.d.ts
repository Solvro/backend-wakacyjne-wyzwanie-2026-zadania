import { ParticipantsService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    create(dto: CreateParticipantDto): import(".prisma/client").Prisma.Prisma__ParticipantClient<{
        name: string;
        email: string;
        phone: string | null;
        id: number;
        tripId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        email: string;
        phone: string | null;
        id: number;
        tripId: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        phone: string | null;
        id: number;
        tripId: number;
    }>;
    update(id: number, dto: UpdateParticipantDto): Promise<{
        name: string;
        email: string;
        phone: string | null;
        id: number;
        tripId: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        email: string;
        phone: string | null;
        id: number;
        tripId: number;
    }>;
}
