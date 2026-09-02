import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: DatabaseService){}

    async register(registerDto: RegisterDto){
        const {email, password} = registerDto;

        const existingUser = await this.prisma.user.findUnique({where: {email}});

        if(existingUser){
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.prisma.user.create({
            data: {email: email, password: hashedPassword},
        });
        
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword; 
    }
}
