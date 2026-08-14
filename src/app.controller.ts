import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService, BrewCoffeeType } from './app.service';

@Controller("solvro")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://www.solvro.pwr.edu.pl/', 307)
  goToWebsite() : string {
    return "Redirecting to Solvro website...";
  }

  @Get("brewCoffee")
  @HttpCode(418)
  @Header("Content-Type", "application/json")
  brewCoffee() : BrewCoffeeType {
    return this.appService.getBrewCoffee();
  }
}