import { Injectable } from '@nestjs/common';

export interface BrewCoffeeResponse {
  message: string;
  funnyPictureURL: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  brewCoffee(): BrewCoffeeResponse {
    return {
      message: "I'm a teapot",
      funnyPictureURL: 'https://http.cat/images/418.jpg',
    };
  }
}
