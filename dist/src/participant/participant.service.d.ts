import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
export declare class ParticipantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateParticipantDto): import(".prisma/client").Prisma.Prisma__ParticipantClient<{
        email: string;
        id: number;
        name: string;
        phone: string | null;
        tripId: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        id: number;
        name: string;
        phone: string | null;
        tripId: number;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        id: number;
        name: string;
        phone: string | null;
        tripId: number;
    }>;
    update(id: number, dto: UpdateParticipantDto): Promise<{
        email: string;
        id: number;
        name: string;
        phone: string | null;
        tripId: number;
    }>;
    remove(id: number): Promise<{
        email: string;
        id: number;
        name: string;
        phone: string | null;
        tripId: number;
    }>;
}
