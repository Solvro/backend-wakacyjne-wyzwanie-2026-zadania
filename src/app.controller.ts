import { Controller, Get, HttpCode, Redirect, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.prz.edu.pl', 307)
  getSolvro() {
    return;
  }

  @Get('brewCoffee')
  @HttpCode(418)
  getBrewCoffee(@Res() response: Response) {
    response.header('Content-Type', 'application/json');

    return response.json(this.appService.getBrewCoffee());
  }
}
