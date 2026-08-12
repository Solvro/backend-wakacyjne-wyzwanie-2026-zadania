import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { TeapotDto } from './teapot.dto';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirectToSolvro() {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  brewCoffee(): TeapotDto {
    return this.appService.brewCoffee();
  }
}
