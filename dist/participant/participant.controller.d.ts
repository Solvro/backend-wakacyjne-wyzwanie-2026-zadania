import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantController {
    private readonly participantService;
    constructor(participantService: ParticipantService);
    create(createParticipantDto: CreateParticipantDto): import(".prisma/client").Prisma.Prisma__ParticipantClient<{
        id: number;
        name: string;
        email: string;
        tripId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        email: string;
        tripId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        email: string;
        tripId: number;
    }>;
    update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<{
        id: number;
        name: string;
        email: string;
        tripId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        email: string;
        tripId: number;
    }>;
}
