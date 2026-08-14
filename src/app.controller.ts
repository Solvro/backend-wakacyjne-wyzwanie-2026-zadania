import { Controller, Get, Redirect, HttpCode, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(307)
  @Redirect('https://solvro.pwr.edu.pl')
  redirectToSite() {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  brewCoffee(): string {
    return JSON.stringify(this.appService.brewCoffee());
  }
}
