import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCoffeeResponse() {
    return {
      message: "I'm a teapot",
      funnyPictureURL: 'https://http.cat/images/418.jpg',
    };
  }
}
