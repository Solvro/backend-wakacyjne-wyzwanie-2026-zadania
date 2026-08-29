import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('solvro')
@Controller('solvro')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Redirect to Solvro main page' })
  @ApiResponse({
    status: 307,
    description: 'Temporary redirect to solvro.pwr.edu.pl',
  })
  @Redirect('https://solvro.pwr.edu.pl', HttpStatus.TEMPORARY_REDIRECT)
  solvroRedirect() {}

  @Get('brewCoffee')
  @ApiOperation({ summary: 'Attempt to brew coffee' })
  @ApiResponse({ status: 418, description: "I'm a teapot" })
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Header('Content-Type', 'application/json')
  brewCoffee() {
    return this.appService.brewCoffee();
  }
}
