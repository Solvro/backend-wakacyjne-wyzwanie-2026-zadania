import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";

interface CreateTripDto {
  destination: string;
  date: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("trips")
  async getTrips() {
    return await this.prisma.trip.findMany();
  }

  @Post("trips")
  async createTrip(@Body() body: CreateTripDto) {
    const newTrip = await this.prisma.trip.create({
      data: {
        date: new Date(body.date),
        destination: body.destination,
      },
    });
    return newTrip;
  }
}
