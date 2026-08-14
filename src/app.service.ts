import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  brewCoffee(): Object {
    return {
      message: "I'm a teapot",
      funnyPictureUrl: "https://http.cat/images/418.jpg"
    };
  }
}