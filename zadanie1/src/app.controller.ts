import { Controller, Get, Header, Headers, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { REDIRECT_METADATA } from '@nestjs/common/constants';


@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  getBrewCoffee(): {"message": string, "funnyPictureURL": string} {
    return {
    "message":  "I'm a teapot",
    "funnyPictureURL": "https://http.cat/images/418.jpg"
    }
  }

  
  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  getSolvro(){
  }
}
