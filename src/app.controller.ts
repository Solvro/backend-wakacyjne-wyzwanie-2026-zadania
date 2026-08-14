import { Controller, Get, HttpCode, Redirect, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl/', 307)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  getSillyCat(){
    return this.appService.getSillyCat();
  }
}

