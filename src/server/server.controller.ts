import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServerService } from './server.service';

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get()
  getHello(): string {
    return this.serverService.getHello();
  }

  @Post('public-key')
  getPublicKey(@Body() publicKeyPayload: { publicKey: string }): {
    publicKey: string;
  } {
    return {
      publicKey: this.serverService.getPublicKey(publicKeyPayload.publicKey),
    };
  }
}
