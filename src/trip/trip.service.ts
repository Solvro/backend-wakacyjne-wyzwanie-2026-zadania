import { Injectable, NotFoundException} from '@nestjs/common';
import { DatabaseService } from "../database/database.service";
import { Trip } from "@prisma/client";
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripService {
  constructor(private databaseService: DatabaseService) {}

   async create(createTripDto: CreateTripDto): Promise<Trip> {
    return this.databaseService.trip.create({
      data: {
        destination: createTripDto.destination,
        start_date: createTripDto.start_date,
        end_date: createTripDto.end_date,
        status: createTripDto.status,
      }
    });
  }

  async findAll(): Promise<Trip[]> {
    return this.databaseService.trip.findMany();
  }

  async findOne(id: number): Promise<Trip> {
    const trip = await this.databaseService.trip.findUnique({
      where: { id },
    });
    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    await this.findOne(id);
    return this.databaseService.trip.update({
        where: { id },
        data: {
          destination: updateTripDto.destination,
          start_date: updateTripDto.start_date,
          end_date: updateTripDto.end_date,
          status: updateTripDto.status
        }
    });
  }

  async remove(id: number): Promise<Trip> {
    await this.findOne(id);
    return this.databaseService.trip.delete({
      where: { id }
    });
  }
}
