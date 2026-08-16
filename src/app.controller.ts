import { Controller, Get, Header, Redirect, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("https://solvro.pwr.edu.pl/", 307)
  getSolvro() {
    
  }

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  getBrewCoffee() {
    return {
      "message": "I'm a teapot",
      "funnyPictureURL": "https://http.cat/images/418.jpg"
    };
  }
}
