import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirectSolvro(): void {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  teapotCat(): Record<string, string> {
    return this.appService.teapotCat();
  }
}
