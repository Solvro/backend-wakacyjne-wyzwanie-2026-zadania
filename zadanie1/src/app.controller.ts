import { Controller, Get, HttpCode, Redirect, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirect() {
    return;
  }
  @Get('brewCoffe')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  brewCoffe() {
    return this.appService.teaPot();
  }
}
