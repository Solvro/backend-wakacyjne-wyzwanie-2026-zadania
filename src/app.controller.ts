import { Controller, Get, Redirect, HttpCode, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('solvro')
export class SolvroController {
  @Get()
  @Redirect('https://solvro.pwr.edu.pl', 307)
  solvroRedirection(){
    console.log('Redirected to solvro!');
  }

  @Get('brewCoffee')
  @HttpCode(418)
  @Header('Content-Type', 'application/json')
  getCoffee() {
     return {
      "message": "I'm a teapot",
      "funnyPictureURL": "https://http.cat/images/418.jpg"
    }
  }
}
