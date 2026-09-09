import { Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async update(userId: number, updateUserDto: UpdateUserDto) {
        const dataToUpdate: any = {};

        if (updateUserDto.email) {
            const existingUser = await this.databaseService.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (existingUser && existingUser.id !== userId) {
                throw new ConflictException('Użytkownik z tym adresem e-mail już istnieje');
            }
            dataToUpdate.email = updateUserDto.email;
        }

        if (updateUserDto.password) {
            dataToUpdate.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        const updatedUser = await this.databaseService.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });

        return {
            id: updatedUser.id,
            email: updatedUser.email,
        };
    }
}