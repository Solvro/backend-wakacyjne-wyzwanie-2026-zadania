import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) { }


    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.databaseService.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with this id not found`);
        }

        if (updateUserDto.email !== undefined && updateUserDto.email !== user.email) {
            const existingUser = await this.databaseService.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
        }

        const data: { email?: string; password?: string } = {};

        if (updateUserDto.email !== undefined) {
            data.email = updateUserDto.email;
        }

        if (updateUserDto.password !== undefined) {
            data.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        return this.databaseService.user.update({
            where: { id },
            data,
        });

    }
}
