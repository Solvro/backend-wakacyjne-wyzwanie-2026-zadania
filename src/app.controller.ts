
import { Controller, Get, Redirect, HttpCode, Header } from '@nestjs/common';
import { AppService } from './app.service';
@Controller('solvro') // ustawiamy endpoint dla wszystkich jako /solvro




export class AppController {
  constructor(private readonly appService: AppService) {}

  // I endpoint: http://127.0.0.1:3000/solvro
  @Get() 
  @Redirect('https://solvro.pwr.edu.pl', 307) // przekierowanie
  getSolvroWebsite() {
  }


  // II endpoint: http://127.0.0.1:3000/solvro/brewCoffee
  @Get('brewCoffee') 
  @HttpCode(418) 
  @Header('Content-Type', 'application/json') // naglowek
  brewCoffee() {
    return this.appService.getTeapotData();     // funkcja z app.service.ts
  }
}