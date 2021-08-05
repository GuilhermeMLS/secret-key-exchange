import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { DiffieHellmanModule } from '../diffie-hellman/diffie-hellman.module';

@Module({
  imports: [DiffieHellmanModule],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
