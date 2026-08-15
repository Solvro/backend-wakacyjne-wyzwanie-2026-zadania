import { Injectable } from '@nestjs/common';


@Injectable() 
// metoda getTeapotData() zwraca obiekt JSON
export class AppService {
  getTeapotData() {
    return {
      message: "I'm a teapot",
      funnyPictureURL: "https://http.cat/images/418.jpg"
    };
  }
}