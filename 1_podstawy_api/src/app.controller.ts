import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { TeapotResponse } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', HttpStatus.TEMPORARY_REDIRECT)
  redirectToSolvro(): void {}

  @Get('brewCoffee')
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Header('Content-Type', 'application/json')
  brewCoffee(): TeapotResponse {
    return this.appService.getTeapotData();
  }
}
