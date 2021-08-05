import { Controller, Get } from '@nestjs/common';
import { ServerService } from './server.service';

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  getHello(): string {
    return this.serverService.getHello();
  }

  @Get('public-key')
  getPublicKey(): {
    publicKey: string;
  } {
    return {
      publicKey: this.serverService.getPublicKey(),
    };
  }
}
