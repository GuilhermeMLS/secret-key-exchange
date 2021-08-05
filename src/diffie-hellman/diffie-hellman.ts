import { Injectable } from '@nestjs/common';
import { createCipheriv, createECDH, ECDH, randomBytes } from 'crypto';

@Injectable()
export class DiffieHellman {
  private readonly secretKey: string;
  private readonly CURVE_TYPE = 'secp256k1';
  private readonly client: ECDH;
  private readonly INITIALIZATION_VECTOR_SIZE = 16;
  private readonly CRYPTOGRAPHY_ALGORITHM = 'aes-256-gcm';

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

  public encryptMessage(commonKey: string, message: string): string {
    const initializationVector = randomBytes(this.INITIALIZATION_VECTOR_SIZE);
    const cipher = createCipheriv(
      this.CRYPTOGRAPHY_ALGORITHM,
      Buffer.from(commonKey, 'hex'),
      initializationVector,
    );
    return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
  }
}
