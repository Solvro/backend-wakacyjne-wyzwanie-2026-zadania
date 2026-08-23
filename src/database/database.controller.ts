import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('trips')
export class DatabaseController {
    constructor(private prisma: DatabaseService) { }


    @Get()
    findAll() {
        return this.prisma.trip.findMany({
            include: { participants: true, expenses: true },
        });
    }


    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.prisma.trip.findUnique({
            where: { id },
            include: { participants: true, expenses: true },
        });
    }


    @Post()
    create(
        @Body()
        body: {
            name: string;
            destination: string;
            startDate: string;
            endDate: string;
            budget: number;
            description?: string;
        },
    ) {
        return this.prisma.trip.create({
            data: {
                ...body,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
            },
        });
    }


    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.prisma.trip.delete({ where: { id } });
    }
}
