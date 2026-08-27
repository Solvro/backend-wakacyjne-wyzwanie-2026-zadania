import { Injectable } from '@nestjs/common';
import { CreateXyzDto } from './dto/create-xyz.dto';
import { UpdateXyzDto } from './dto/update-xyz.dto';

@Injectable()
export class XyzService {
  create(createXyzDto: CreateXyzDto) {
    return 'This action adds a new xyz';
  }

  findAll() {
    return `This action returns all xyz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xyz`;
  }

  update(id: number, updateXyzDto: UpdateXyzDto) {
    return `This action updates a #${id} xyz`;
  }

  remove(id: number) {
    return `This action removes a #${id} xyz`;
  }
}
