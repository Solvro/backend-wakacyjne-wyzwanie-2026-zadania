import { Controller, Get, HttpCode, Redirect, Header } from '@nestjs/common';
import { type Response } from 'express';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  getSolvro() {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  brewCoffee() {
    return this.appService.brewCoffee();
  }
}
