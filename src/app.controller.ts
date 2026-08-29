import { Controller, Get, Header, HttpCode, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("solvro")
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  redirectSolvro() {
  }

  @Get("brewCoffee")
  @HttpCode(418)
  @Header('content-type', 'application/json')
  brewCoffee() {
    return {
      message: "I'm a teapot",
      funnyPictureURL: "https://http.cat/images/418.jpg"
    };
  }
}
