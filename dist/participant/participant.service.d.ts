import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createParticipantDto: CreateParticipantDto): import(".prisma/client").Prisma.Prisma__ParticipantClient<{
        id: number;
        tripId: number;
        name: string;
        email: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        tripId: number;
        name: string;
        email: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        tripId: number;
        name: string;
        email: string;
    }>;
    update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<{
        id: number;
        tripId: number;
        name: string;
        email: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        tripId: number;
        name: string;
        email: string;
    }>;
}
