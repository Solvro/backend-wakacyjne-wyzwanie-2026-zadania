import { Controller, Get, Post, Body, Header} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('trips')
  getAllTrips(){
    return this.appService.getAllTrips();
  }

  @Header('Content-Type', 'application/json')
  @Post('trips')
  addTrip(@Body() body: any){
    return this.appService.addTrip(
      body.destination,
      new Date(body.startDate),
      new Date(body.endDate),
      body.budget,
      body.description
    )
  }
}

