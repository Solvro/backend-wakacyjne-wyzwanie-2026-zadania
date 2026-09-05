import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Adds a user to the database. The email must be unique',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    type: User,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Lists all users in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [User],
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user',
    description: 'Retrieves a single user by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The user with the given ID',
    type: User,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    description:
      'Updates a user by their ID. If the email is changed, it must remain unique',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
    type: User,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Removes a user from the database by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted',
    type: User,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
