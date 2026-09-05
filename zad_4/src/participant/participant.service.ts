import { Injectable } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({ data: createParticipantDto });
  }

  async findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: number) {
    return this.prisma.participant.findFirst({ where: { id } });
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      data: updateParticipantDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.participant.delete({ where: { id } });
  }
}
