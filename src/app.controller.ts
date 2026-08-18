import { Controller, Get, Header, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import type { TeapotMessage } from './app.service';

@Controller('/solvro')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Redirect('https://solvro.pwr.edu.pl', 307)
    redirect(): void {}

    @Get('/brewCoffee')
    @HttpCode(418)
    @Header('Content-Type', 'application/json')
    brewCoffee(): TeapotMessage {
        return this.appService.getTeapotMessage();
    }
}
