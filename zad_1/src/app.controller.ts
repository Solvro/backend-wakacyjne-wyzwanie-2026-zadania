import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Redirect,
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("solvro")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("https://solvro.pwr.edu.pl", HttpStatus.TEMPORARY_REDIRECT)
  goToSolvro() {}

  @Get("brewCoffee")
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Header("Content-Type", "application/json")
  getCoffee() {
    return {
      message: "I'm a teapot",
      funnyPictureURL: "https://http.cat/images/418.jpg",
    };
  }
}
