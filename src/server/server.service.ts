import { Injectable } from '@nestjs/common';
import { DiffieHellman } from '../diffie-hellman/diffie-hellman';

@Injectable()
export class ServerService {
  constructor(private readonly diffieHellman: DiffieHellman) {}

  getHello(): string {
    return 'Hello World from Server!';
  }

  getPublicKey(): string {
    return this.diffieHellman.generatePublicKey();
  }
}
