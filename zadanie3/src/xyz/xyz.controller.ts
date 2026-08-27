import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { XyzService } from './xyz.service';
import { CreateXyzDto } from './dto/create-xyz.dto';
import { UpdateXyzDto } from './dto/update-xyz.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; 

@ApiTags('xyz')
@Controller('xyz')
export class XyzController {
  constructor(private readonly xyzService: XyzService) {}
  
  @Post()
  @ApiOperation({ summary: 'tworzy' })
  @ApiResponse({ status: 201, description: 'sukces' })
  @ApiResponse({ status: 400, description: 'blad danych' })
  create(@Body() createXyzDto: CreateXyzDto) {
    return this.xyzService.create(createXyzDto);
  }

  @Get()
  @ApiOperation({ summary: 'pobiera liste' })
  @ApiResponse({ status: 200, description: 'sukces' })
  findAll() {
    return this.xyzService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'getuje po id' })
  @ApiParam({ name: 'id', description: 'index' })
  @ApiResponse({ status: 200, description: 'sukces' })
  @ApiResponse({ status: 400, description: 'blad danych' })
  @ApiResponse({ status: 404, description: 'blad 404' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.xyzService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'aktualizuje' })
  @ApiParam({ name: 'id', description: 'index' })
  @ApiResponse({ status: 200, description: 'sukces' })
  @ApiResponse({ status: 404, description: 'blad danych' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateXyzDto: UpdateXyzDto) {
    return this.xyzService.update(id, updateXyzDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'usuwa' })
  @ApiParam({ name: 'id', description: 'index' })
  @ApiResponse({ status: 200, description: 'sukces' })
  @ApiResponse({ status: 404, description: 'blad danych' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.xyzService.remove(id);
  }
}