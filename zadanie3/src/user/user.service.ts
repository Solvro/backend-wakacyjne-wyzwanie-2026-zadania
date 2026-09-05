import { Injectable, NotFoundException, UnauthorizedException, ConflictException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';
import { SignInDto } from './dto/sign-in.dto';
import {UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private  jwtService: JwtService, private databaseService: DatabaseService) {}

    async findOne(email: string): Promise<any>{

        const user = await this.databaseService.user.findUnique({
            where: {email}
        });

        return user;
    }

    async findOneId(id: number): Promise<User>{

        const user = await this.databaseService.user.findUnique({
            where: { id }
        });

        if(!user){
            throw new NotFoundException(`User with id ${id} not found`)
        }

        return user;
    }


    async signIn(signInDto: SignInDto): Promise<string> {

        const user = await this.findOne(signInDto.email);

        if(!user){
            throw new NotFoundException(`User with email ${signInDto.email} not found`)
        }

        const correct = await bcrypt.compare(signInDto.password, user.password);
        
        if(!correct){
            throw new UnauthorizedException("Wrong password");
        }

        const payload = { sub: user.id, email: user.email, timestamp: Date.now(), password: user.password, date_of_birth: user.date_of_birth };

        const token = this.jwtService.sign(payload);

        return token;
    }

    async registration(registrationDto: RegistrationDto):Promise<User> {
        
        const user = await this.findOne(registrationDto.email);
        
        if(user) {
            throw new ConflictException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(registrationDto.password, 10);

        const newUser = await this.databaseService.user.create({

            data:{
                email: registrationDto.email,
                password: hashedPassword,
                date_of_birth: registrationDto.date_of_birth
            }
        })

        const {password, ...result} = newUser;

        return result;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {

        await this.findOneId(id);

        const user = await this.databaseService.user.update({
            where: { id },
            data: {
                email : updateUserDto.email,
                password: updateUserDto.password,
                date_of_birth: updateUserDto.date_of_birth,
            }
        });

        const {password, ...result} = user;

        return result;
    }
    
}
