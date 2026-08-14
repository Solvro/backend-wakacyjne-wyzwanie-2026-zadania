import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirectToSolvro(){}

  @Get('brewCoffee')
  @Header('Content-Type', 'application/json')
  @HttpCode(418)

  brewCoffee() {
    return this.appService.brewCoffee();
  }
}
