import { Injectable } from '@nestjs/common';
import { TeapotDto } from './teapot.dto';

@Injectable()
export class AppService {
  brewCoffee(): TeapotDto {
    return {
      message: "I'm a teapot",
      funnyPictureURL: 'https://http.cat/images/418.jpg',
    };
  }
}
