import { Controller, Get, Header, Redirect, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirectToSolvro(): void {}

  @Get('brewCoffee')
  @Header('Content-Type', 'application/json')
  @HttpCode(418)
  teapotCat(): { message: string; funnyPictureURL: string } {
    return this.appService.teapotCatService();
  }
}
