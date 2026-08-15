import { Injectable } from '@nestjs/common';


// deklarujemy interfejs dla odpowiedzi JSON
export interface TeapotResponse {
  message: string;
  funnyPictureURL: string;
}

@Injectable() 
// metoda getTeapotData() zwraca obiekt JSON
export class AppService {
  getTeapotData(): TeapotResponse {
    return {
      message: "I'm a teapot",
      funnyPictureURL: "https://http.cat/images/418.jpg"
    };
  }
}