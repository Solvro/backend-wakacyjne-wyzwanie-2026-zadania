import { Injectable } from '@nestjs/common';

export interface RedirectToSolvroResponse {
  url: string;
}

export interface BrewCoffeeResponse {
  message: string;
  funnyPictureURL: string;
}

@Injectable()
export class AppService {
  redirectToSolvro(): RedirectToSolvroResponse {
    return {
      url: "https://solvro.pwr.edu.pl",
    }
  }

  brewCoffee(): BrewCoffeeResponse {
    return {
      message: "I'm a teapot",
      funnyPictureURL: "https://http.cat/images/418.jpg", 
    }
  }
}
