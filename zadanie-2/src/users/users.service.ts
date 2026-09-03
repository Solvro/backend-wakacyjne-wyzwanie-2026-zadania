import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    constructor(private databaseService: DatabaseService) {}

    async create(data: {email: string, password: string}) {
        return await this.databaseService.user.create({
            data,
        })
    }

    async findOne(email: string) {
        return await this.databaseService.user.findUnique({
            where: {
                email,
            },
        });
    }
}
