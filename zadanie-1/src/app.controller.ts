import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import type { TeapotResponse } from './app.service';

@Controller("solvro")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("https://solvro.pwr.edu.pl",307)
  redirectToSolvro(): void {
  }

  @Get("brewCoffee")
  @HttpCode(418)
  @Header("content-type", "application/json")
  teapot(): TeapotResponse {
    return this.appService.teapot()
  }
}
