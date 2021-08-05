import { Injectable } from '@nestjs/common';
import { createECDH, ECDH } from 'crypto';

@Injectable()
export class DiffieHellman {
  private readonly secretKey: string;
  private readonly CURVE_TYPE = 'secp256k1';
  private readonly client: ECDH;

  constructor() {
    this.client = createECDH(this.CURVE_TYPE);
    this.client.generateKeys();
  }

  public generateCommonKey(publicKey: string): string {
    return this.client.computeSecret(publicKey, 'base64', 'hex');
  }

  public generatePublicKey(): string {
    return this.client.getPublicKey().toString('base64');
  }
}
