import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  createECDH,
  ECDH,
  randomBytes,
} from 'crypto';

@Injectable()
export class DiffieHellman {
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
    const encryptedMessage =
      cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return initializationVector.toString('hex') + encryptedMessage + authTag;
  }

  public decryptMessage(commonKey: string, message: string): string {
    const initializationVector = message.substr(0, 32);
    const encryptedMessage = message.substr(32, message.length - 32 - 32);
    const authTag = message.substr(message.length - 32, 32);
    try {
      const decipher = createDecipheriv(
        this.CRYPTOGRAPHY_ALGORITHM,
        Buffer.from(commonKey, 'hex'),
        Buffer.from(initializationVector, 'hex'),
      );
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      return (
        decipher.update(encryptedMessage, 'hex', 'utf8') +
        decipher.final('utf8')
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
