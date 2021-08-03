import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { HttpModule } from '@nestjs/axios';
import { DiffieHellmanModule } from '../diffie-hellman/diffie-hellman.module';

@Module({
  imports: [HttpModule, DiffieHellmanModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
