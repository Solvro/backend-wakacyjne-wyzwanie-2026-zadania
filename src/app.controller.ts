import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("solvro")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://www.solvro.pwr.edu.pl/', 307)
  goToWebsite() {
    return "Redirecting to Solvro website...";
  }

  @Get("brewCoffee")
  @HttpCode(418)
  @Header("Content-Type", "application/json")
  brewCoffee() {
    return this.appService.getBrewCoffee();
  }
}