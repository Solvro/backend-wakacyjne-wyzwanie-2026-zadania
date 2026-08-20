import { Controller, Get, Redirect, HttpCode, Header } from '@nestjs/common';
import type { BrewCoffeeResponse } from './app.service';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirect(): void {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  brewCoffee(): BrewCoffeeResponse {
    return this.appService.brewCoffee();
  }
}
