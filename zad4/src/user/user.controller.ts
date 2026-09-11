import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiOperation ,ApiConflictResponse, ApiOkResponse} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({summary: 'Register of new User'})
  @ApiCreatedResponse({
    description: 'User has been succesfully created',
    schema:{
      example:{
        id:1,
        email:'nigga@nogga.com'
      }
    }
  })
  @ApiConflictResponse({ 
    description: 'User with given email already exists(Error 409)' 
  })
  async create(@Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto);
  }


  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiCreatedResponse({ 
    description: 'Successfully logged in, returns JWT token' 
  })
  async login(@Body() loginDto: CreateUserDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard) 
  @Patch('user') 
  @ApiOperation({ summary: 'Update logged in user data' })
  @ApiOkResponse({ description: 'User profile has been updated' })
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.sub, dto);
  }

}
