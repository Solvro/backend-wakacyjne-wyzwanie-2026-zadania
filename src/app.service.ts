import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/database.service';

@Injectable()
export class AppService{
  constructor(private prisma: PrismaService){}

  getAllTrips(){
    return this.prisma.trip.findMany();
  }

  addTrip(destination:string, startDate: Date, endDate: Date, budget: number,description?:string){
    return this.prisma.trip.create({
      data:{
        destination: destination,
        description: description,
        startDate: startDate,
        endDate: endDate,
        budget: budget

      }
    })
  }

}