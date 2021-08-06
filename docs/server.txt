import { Injectable } from '@nestjs/common';
import { DiffieHellman } from '../diffie-hellman/diffie-hellman';

@Injectable()
export class ServerService {
  private clientPublicKey: string;
  constructor(private readonly diffieHellman: DiffieHellman) {}

  getHello(): string {
    return 'Hello World from Server!';
  }

  getPublicKey(): string {
    return this.diffieHellman.generatePublicKey();
  }

  setClientPublicKey(publicKey: string): string {
    this.clientPublicKey = publicKey;
    console.log(this.clientPublicKey);
    return 'CLIENT PUBLIC KEY SET';
  }

  sendMessage(payload: { encryptedMessage: string }): {
    message: 'OK' | 'ERROR';
  } {
    if (!this.clientPublicKey) {
      console.error('[Server] Client public key not found');
      return {
        message: 'ERROR',
      };
    }
    const commonKey = this.diffieHellman.generateCommonKey(
      this.clientPublicKey,
    );
    console.log('[Server] 🔑 Common key: ' + commonKey);
    try {
      const decryptedMessage = this.diffieHellman.decryptMessage(
        commonKey,
        payload.encryptedMessage,
      );
      console.log('[Server] Decrypted Message: ' + decryptedMessage);
      return {
        message: 'OK',
      };
    } catch (err) {
      console.error(err);
      return {
        message: 'ERROR',
      };
    }
  }
}
