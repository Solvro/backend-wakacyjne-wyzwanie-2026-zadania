import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createParticipantDto: CreateParticipantDto): import(".prisma/client").Prisma.Prisma__ParticipantClient<{
        email: string;
        id: number;
        name: string;
        tripId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        id: number;
        name: string;
        tripId: number;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        id: number;
        name: string;
        tripId: number;
    }>;
    update(id: number, updateParticipantDto: UpdateParticipantDto): Promise<{
        email: string;
        id: number;
        name: string;
        tripId: number;
    }>;
    remove(id: number): Promise<{
        email: string;
        id: number;
        name: string;
        tripId: number;
    }>;
}
