import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTeapot() {
    return {
      message: "I'm a teapot",
      funnyPictureURL: 'https://http.cat/images/418.jpg',
    };
  }
}
