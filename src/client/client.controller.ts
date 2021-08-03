import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { RequestType } from './types/request.type';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getHello(): string {
    return this.clientService.getHello();
  }

  @Post('start')
  async startCommunication(@Body() request: RequestType): Promise<string> {
    return this.clientService.startCommuncation(request);
  }
}
