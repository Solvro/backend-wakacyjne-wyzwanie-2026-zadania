import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import type { CatPics } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  do_not_break() : void {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type','application/json')
  getCoffee() : CatPics {
    return this.appService.getCoffee();
  }
}