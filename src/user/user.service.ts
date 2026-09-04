import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/database.service';
import { User } from '../../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where:{
        id,
      },
      data:{
        email: updateUserDto.email,
        hashedPassword: updateUserDto.hashedPassword
    }
    ,
      select:{
        id:true,
        email:true,
        createdAt:true
      }
  
  });
  }

  async findOne(email:string):Promise<User|undefined>{
    const user = await this.prisma.user.findUnique({
      where:{
        email
      }
    });
    return user??undefined
  }

  create(createUserDto:CreateUserDto){
    return this.prisma.user.create({
      data:{
        email: createUserDto.email,
        hashedPassword: createUserDto.hashedPassword
      },
      select:{
        id:true,
        email:true,
        createdAt:true
      }
    })
  }

}
