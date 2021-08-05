import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('message')
  sendMessage(
    @Body() payload: { publicKey: string; encryptedMessage: string },
  ): {
    message: 'OK' | 'ERROR';
  } {
    return this.serverService.sendMessage(payload);
  }
}
