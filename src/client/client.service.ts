import { Injectable } from '@nestjs/common';
import { RequestType } from './types/request.type';

@Injectable()
export class ClientService {
  getHello(): string {
    return 'Hello World from Client!';
  }

  startCommuncation(request: RequestType): string {
    return 'Your message is: ' + request.message;
  }
}
