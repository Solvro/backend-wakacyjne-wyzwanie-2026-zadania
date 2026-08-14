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
  @Redirect()
  redirectToSolvro(): { url: string; statusCode: number } {
    return {
      url: this.appService.getSolvroUrl(),
      statusCode: HttpStatus.TEMPORARY_REDIRECT,
    };
  }

  @Get('brewCoffee')
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Header('Content-Type', 'application/json')
  brewCoffee(): TeapotResponse {
    return this.appService.brewCoffee();
  }
}
