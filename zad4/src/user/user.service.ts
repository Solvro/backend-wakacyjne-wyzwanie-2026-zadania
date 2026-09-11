import { ConflictException, Injectable,UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
              private readonly jwtService: JwtService){}

  async create(createUserDto:CreateUserDto){
    const {email,password}=createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where:{
        email: email
      },
    });
    
    if (existingUser) {
      throw new ConflictException("User with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
      select:{
        id:true,
        email:true
      }
    });
  }
  async login(loginDto: CreateUserDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });


    if (!user) {
      throw new UnauthorizedException('Invalid Email or password');
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Email or password');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      timestamp: Date.now() 
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
  async update(userId: number, dto: UpdateUserDto) {
    const dataToUpdate = { ...dto };


    if (dataToUpdate.email) { //sprawdza czy nie wpisuje już podanego maila innego użytkownika
      const userWithGivenEmail = await this.prisma.user.findUnique({
        where: { email: dataToUpdate.email }
      });
      if (userWithGivenEmail && userWithGivenEmail.id !== userId) {
        throw new ConflictException('Ten adres email jest już zajęty przez innego użytkownika');
      }
    }
    if (dataToUpdate.password) {
      dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { 
        id: userId 
      },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        
      }
    });
    return updatedUser;
  }
}
