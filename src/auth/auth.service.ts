import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { timestamp } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService
    , private readonly jwtService: JwtService
  ){}

  async signIn(email:string, pass:string):Promise<any>{
    const user = await this.userService.findOne(email);
    if(!user){
      throw new UnauthorizedException()
    }
    const passwordValid = await bcrypt.compare(
      pass,
      user.hashedPassword
    )
    if(!passwordValid){
      throw new UnauthorizedException();
    }
    const payload = {sub:user.id,email:user.email, timestamp:Date.now()}
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email:string, password:string){
    const existingUser = await this.userService.findOne(email);
    if(existingUser){
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    return this.userService.create({
      email,
      hashedPassword
    })
    };
  }

