import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBrewCoffee() {
    return {
      message: 'I\'m a teapot',
      URL: 'https://http.cat/images/418.jpg',
    };
  }
}
