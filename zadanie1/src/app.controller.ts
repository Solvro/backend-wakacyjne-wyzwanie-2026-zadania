import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  getBrewCoffee(): {"message": string, "funnyPictureURL": string} {
    
    return this.appService.brewCoffee();
  }

  
  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  getSolvro(){
  }
}
