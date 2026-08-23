import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Redirect,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirect() {}

  @Get('brewCoffee')
  brewCoffee(@Res() res: Response) {
    try {
      const data = this.appService.brewCoffee();
      res
        .status(418)
        .setHeader('Content-Type', 'application/json')
        .json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
