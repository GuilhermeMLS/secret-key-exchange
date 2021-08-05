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

  sendMessage(payload: { publicKey: string; encryptedMessage: string }): {
    message: 'OK' | 'ERROR';
  } {
    const commonKey = this.diffieHellman.generateCommonKey(payload.publicKey);
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
