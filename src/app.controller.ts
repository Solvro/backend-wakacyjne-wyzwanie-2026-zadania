import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  @Get('solvro/brewCoffee')
  getHello(): string {
    return this.appService.getHello();
  }
}
