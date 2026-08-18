import { Injectable } from '@nestjs/common';

export interface TeapotMessage {
    message: string;
    funnyPictureURL: string;
}

@Injectable()
export class AppService {
    getTeapotMessage(): TeapotMessage {
        return {
            message: "I'm a teapot",
            funnyPictureURL: 'https://http.cat/images/418.jpg',
        };
    }
}
