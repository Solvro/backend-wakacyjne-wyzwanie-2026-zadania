import { Injectable } from '@nestjs/common';
import type { IBrewCoffee } from './types';

@Injectable()
export class AppService {
  brewCoffee(): IBrewCoffee {
    return {
      message: "I'm a teapot",
      funnyPictureUrl: "https://http.cat/images/418.jpg"
    };
  }
}