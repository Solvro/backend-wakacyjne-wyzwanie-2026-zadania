import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from '../database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService){}

  create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data:{
        firstName: createParticipantDto.firstName,
        lastName: createParticipantDto.lastName,
        email: createParticipantDto.email,
        dateJoined: new Date (createParticipantDto.dateJoined),
         trip:{
          connect:{
            id: createParticipantDto.tripId,
          }
         }
      },
    });
  }

  findAll(page:number, limit:number) {
    return this.prisma.participant.findMany({
      take:limit,
      skip:(page-1)*limit,
    });
  }

  findOne(id: number) {
    return this.prisma.participant.findUnique({
      where:{
        id,
      }
    });
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where:{
        id,
      },
      data:{
        firstName: updateParticipantDto.firstName,
        lastName: updateParticipantDto.lastName,
        email: updateParticipantDto.email,
        dateJoined: updateParticipantDto.dateJoined? new Date (updateParticipantDto.dateJoined): undefined,
         trip:updateParticipantDto.tripId?{
          connect:{
            id: updateParticipantDto.tripId,
          }
         }:undefined,
      }
    });
  }

  remove(id: number) {
    return this.prisma.participant.delete({
      where:{
        id,
      }
    });
  }
}
