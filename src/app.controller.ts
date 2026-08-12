import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  getSolvro() {}

  @Get('/brewCoffee')
  brewCoffee(@Res() res: Response) {
    res.status(418).json(this.appService.brewCoffee());
  }
}
