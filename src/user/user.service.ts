import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  
  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
             where: { user_id: id }
           })
           if (!user) {
             throw new NotFoundException("No trip with this id")
           }
           return user;
      }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      throw new NotFoundException('No such user');
    }
    
    let passwdhash = user.password;

    if (dto.password) {
      passwdhash = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.databaseService.user.update({
      where: { user_id: id },
      data: {
        email: dto.email ? dto.email : user.email,
        password: passwdhash,
      },
    });

    const {password, ...rest} = updatedUser
    return { rest };
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.user.delete({
      where: {user_id : id}
    })
  }
}
