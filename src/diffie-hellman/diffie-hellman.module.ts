import { Module } from '@nestjs/common';
import { DiffieHellman } from './diffie-hellman';

@Module({
  providers: [DiffieHellman],
  exports: [DiffieHellman],
})
export class DiffieHellmanModule {}
