import { Injectable } from '@nestjs/common';

export interface TeapotResponse {
  message: string;
  funnyPictureURL: string;
}

@Injectable()
export class AppService {
  getSolvroUrl(): string {
    return 'https://solvro.pwr.edu.pl';
  }

  brewCoffee(): TeapotResponse {
    return {
      message: "I'm a teapot",
      funnyPictureURL: 'https://http.cat/images/418.jpg',
    };
  }
}
