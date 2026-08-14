import { Controller, Get, Header, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/solvro')
export class AppController {
    constructor(private readonly appService: AppService) {}

    static readonly solvroLink: string = 'https://solvro.pwr.edu.pl';

    @Get()
    @HttpCode(307)
    @Header('Location', AppController.solvroLink)
    redirect(): string {
        return `Redirecting to ${AppController.solvroLink}`;
    }

    @Get('/brewCoffee')
    @HttpCode(418)
    @Header('Content-Type', 'application/json')
    brewCoffee(): string {
        return JSON.stringify({
            message: "I'm a teapot",
            funnyPictureURL: 'https://http.cat/images/418.jpg',
        });
    }
}
