import { Injectable } from '@nestjs/common';
import { RequestType } from './types/request.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World from Client!';
  }

  async startCommuncation(request: RequestType): Promise<string> {
    const message = 'Your message is: ' + request.message;
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3000/'),
    );
    console.log(response);
    return message + ' | Server message: ' + response.data;
  }
}
